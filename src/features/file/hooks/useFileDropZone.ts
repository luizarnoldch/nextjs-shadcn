"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { FileState, FileVisibility } from "@/generated/prisma/enums";
import useCreateFile from "./useCreateFile";
import useDeleteFile from "./useDeleteFile";
import useUpdateFile from "./useUpdateFile";
import { useListFiles } from "./useListFiles";
import {
  FileItem,
  useMergedQueue,
  useStoreAddFilesToQueue,
  useStoreRemoveFileFromQueue,
} from "../stores/file.store";

export interface UseFileDropZoneReturn {
  // Drop zone
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  isDragActive: boolean;

  // Queue
  queue: FileItem[];
  removeFile: (id: string) => void;
  deleteFile: (id: string) => void;

  // Save
  isCreating: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  uploadableCount: number;
  handleSave: () => Promise<void>;
}

export function useFileDropZone(): UseFileDropZoneReturn {
  // ── Remote files ──────────────────────────────────────────────────────────
  const { data: files } = useListFiles();

  const remoteFiles = useMemo<FileItem[]>(
    () =>
      files?.map((file) => ({
        ...file,
        origin: "remote" as const,
        url: file.url || "",
      })) ?? [],
    [files],
  );

  // ── Store actions ─────────────────────────────────────────────────────────
  const addFilesToQueue = useStoreAddFilesToQueue();
  const removeFileFromQueue = useStoreRemoveFileFromQueue();

  // ── Merged queue ──────────────────────────────────────────────────────────
  const queue = useMergedQueue(remoteFiles);

  // ── Mutations ─────────────────────────────────────────────────────────────
  const { mutateAsync: createFile, isPending: isCreating } = useCreateFile();
  const {
    mutateAsync: deleteFileMutation,
    revalidateFileList: revalidateAfterDelete,
    isPending: isDeleting,
  } = useDeleteFile({
    onSuccess: () => revalidateAfterDelete(),
  });
  const {
    mutateAsync: updateFileAsync,
    revalidateFileList: revalidateAfterUpdate,
    isPending: isUpdating,
  } = useUpdateFile();

  // ── Drop handler ──────────────────────────────────────────────────────────
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const fileItems = await Promise.all(
        acceptedFiles.map(async (file) => {
          const newFile = await createFile({
            name: file.name,
            type: file.type,
            size: file.size,
            state: FileState.PENDING,
            visibility: FileVisibility.PUBLIC,
          });

          return {
            ...newFile,
            origin: "local" as const,
            file,
            url: newFile.url || "",
            presignURL: newFile.presignedUrl || "",
          };
        }),
      );
      addFilesToQueue(fileItems);
    },
    [addFilesToQueue, createFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // ── Delete handler ────────────────────────────────────────────────────────
  const deleteFile = useCallback(
    (id: string) => {
      removeFileFromQueue(id);
      deleteFileMutation({ id });
    },
    [removeFileFromQueue, deleteFileMutation],
  );

  // ── Save handler ──────────────────────────────────────────────────────────
  const uploadableFiles = queue.filter(
    (item) => item.origin === "local" && !!item.file && !!item.presignURL,
  );

  const handleSave = useCallback(async () => {
    if (uploadableFiles.length === 0) return;
    try {
      await Promise.all(
        uploadableFiles.map(async (item) => {
          if (!item.presignURL || !item.file) {
            console.warn(
              `File ${item.name} is missing presigned URL or file object`,
            );
            return;
          }

          const response = await fetch(item.presignURL, {
            method: "PUT",
            body: item.file,
            headers: { "Content-Type": item.type },
          });

          if (!response.ok) throw new Error(`Failed to upload ${item.name}`);

          await updateFileAsync({
            id: item.id,
            key: item.key,
            visibility: FileVisibility.PUBLIC,
            state: FileState.UPLOADED,
          });

          removeFileFromQueue(item.id);
        }),
      );
      revalidateAfterUpdate();
      toast.success("All files uploaded and saved successfully");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error(
        "Failed to save some files. Please check the console for details.",
      );
    }
  }, [
    uploadableFiles,
    updateFileAsync,
    removeFileFromQueue,
    revalidateAfterUpdate,
  ]);

  return {
    // Drop zone
    getRootProps,
    getInputProps,
    isDragActive,

    // Queue
    queue,
    removeFile: removeFileFromQueue,
    deleteFile,

    // Save
    isCreating,
    isDeleting,
    isUpdating,
    uploadableCount: uploadableFiles.length,
    handleSave,
  };
}
