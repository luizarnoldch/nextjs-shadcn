"use client";

import { useCallback } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { useStoreAddFilesToQueue } from "../../stores/file.store";
import useCreateFile from "../../hooks/useCreateFile";
import { FileState, FileVisibility } from "@/generated/prisma/enums";

type Props = {
};

export const FileDropZoneArea = ({ }: Props) => {
  const addFilesToQueue = useStoreAddFilesToQueue();
  const { mutateAsync: createFile } = useCreateFile();

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
            id: newFile.id,
            name: file.name,
            type: file.type,
            size: file.size,
            file,
            origin: "local" as const,
            key: newFile.key,
            presignURL: newFile.presignedUrl,
          };
        })
      );
      addFilesToQueue(fileItems);
    },
    [addFilesToQueue, createFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
      <p className="text-sm font-medium text-center text-muted-foreground">
        <span className="font-semibold text-foreground">Click to upload</span>{" "}
        or drag and drop
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        SVG, PNG, JPG, GIF, Video or any other file
      </p>
    </div>
  );
};
