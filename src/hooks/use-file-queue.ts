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
  presignedUrl: string;
};

export type QueuedFile = RemoteFile | LocalFile;

export interface UseFileQueueProps {
  initialFiles?: Omit<RemoteFile, "type">[];
  onDeleteFile?: (id: string) => Promise<void> | void;
}

export function useFileQueue(props?: UseFileQueueProps) {
  const [queue, setQueue] = useState<QueuedFile[]>(() => {
    return (props?.initialFiles || []).map((f) => ({ ...f, type: "remote" }));
  });
  const [isDeleting, setIsDeleting] = useState<Record<string, boolean>>({});

  const setRemoteFiles = useCallback((files: Omit<RemoteFile, "type">[]) => {
    setQueue((prev) => {
      const localFiles = prev.filter((f) => f.type === "local");
      const newRemoteFiles = files.map((f) => ({ ...f, type: "remote" as const }));
      return [...newRemoteFiles, ...localFiles];
    });
  }, []);


  
  const addLocalFile = useCallback((file: File, id: string, presignedUrl: string) => {
    const newLocalFile: LocalFile = {
      type: "local",
      id,
      file,
      previewUrl: URL.createObjectURL(file), // create local preview
      presignedUrl,
    };

    setQueue((prev) => [...prev, newLocalFile]);
  }, []);

  const uploadFiles = useCallback(async () => {
    const localFiles = queue.filter((f): f is LocalFile => f.type === "local");
    
    const uploadPromises = localFiles.map(async (localFile) => {
      try {
        const response = await fetch(localFile.presignedUrl, {
          method: "PUT",
          body: localFile.file,
          headers: {
            "Content-Type": localFile.file.type || "application/octet-stream",
          },
        });
        
        if (!response.ok) {
           throw new Error(`Failed to upload file: ${localFile.file.name}`);
        }
        
        return { success: true, id: localFile.id };
      } catch (error) {
        console.error("Upload error", error);
        return { success: false, id: localFile.id, error };
      }
    });

    return await Promise.all(uploadPromises);
  }, [queue]);

  const removeFile = useCallback(
    async (id: string) => {
      const fileToRemove = queue.find((f) => f.id === id);
      if (!fileToRemove) return;

      if (props?.onDeleteFile) {
        setIsDeleting((prev) => ({ ...prev, [id]: true }));
        try {
          await props.onDeleteFile(id);
        } catch (error) {
          console.error("Failed to delete file", error);
          setIsDeleting((prev) => ({ ...prev, [id]: false }));
          return; // Abort removing from queue if delete fails
        } finally {
          setIsDeleting((prev) => ({ ...prev, [id]: false }));
        }
      }

      // If successful or if no onDeleteFile provided
      if (fileToRemove.type === "local") {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      setQueue((prev) => prev.filter((f) => f.id !== id));
    },
    [queue, props?.onDeleteFile]
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
    addLocalFile,
    setRemoteFiles,
    removeFile,
    clearQueue,
    uploadFiles,
    isDeleting,
  };
}
