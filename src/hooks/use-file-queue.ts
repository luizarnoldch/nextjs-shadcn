import { useCallback, useEffect, useState } from "react";

export type RemoteFile = {
  type: "remote";
  id: string;
  url: string;
  name?: string;
};

export type LocalFile = {
  type: "local";
  id: string;
  file: File;
  previewUrl: string;
};

export type QueuedFile = RemoteFile | LocalFile;

export interface UseFileQueueProps {
  initialFiles?: Omit<RemoteFile, "type">[];
  onDeleteRemoteFile?: (id: string) => Promise<void> | void;
}

export function useFileQueue(props?: UseFileQueueProps) {
  const [queue, setQueue] = useState<QueuedFile[]>(() => {
    return (props?.initialFiles || []).map((f) => ({ ...f, type: "remote" }));
  });
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  const addLocalFiles = useCallback((files: File[]) => {
    const newLocalFiles: LocalFile[] = files.map((file) => ({
      type: "local",
      id: Math.random().toString(36).substring(7) + Date.now().toString(36),
      file,
      previewUrl: URL.createObjectURL(file), // create local preview
    }));

    setQueue((prev) => [...prev, ...newLocalFiles]);
  }, []);

  const removeFile = useCallback(
    async (id: string) => {
      const fileToRemove = queue.find((f) => f.id === id);
      if (!fileToRemove) return;

      if (fileToRemove.type === "remote") {
        if (props?.onDeleteRemoteFile) {
          setIsDeleting((prev) => ({ ...prev, [id]: true }));
          try {
            await props.onDeleteRemoteFile(id);
            setQueue((prev) => prev.filter((f) => f.id !== id));
          } catch (error) {
            console.error("Failed to delete remote file", error);
            // Optionally handle error state
          } finally {
            setIsDeleting((prev) => ({ ...prev, [id]: false }));
          }
        } else {
          // If no callback, simply remove it
          setQueue((prev) => prev.filter((f) => f.id !== id));
        }
      } else {
        // Revoke object URL to avoid memory leaks
        URL.revokeObjectURL(fileToRemove.previewUrl);
        setQueue((prev) => prev.filter((f) => f.id !== id));
      }
    },
    [queue, props?.onDeleteRemoteFile]
  );

  const clearQueue = useCallback(() => {
    setQueue((prev) => {
      prev.forEach((f) => {
        if (f.type === "local") {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
      return prev.filter((f) => f.type === "remote"); // Or [] to clear all
    });
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      queue.forEach((f) => {
        if (f.type === "local") {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on unmount

  return {
    queue,
    addLocalFiles,
    removeFile,
    clearQueue,
    isDeleting,
  };
}
