"use client";

import React from "react";
import { X, File as FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileItem, useStoreRemoveFileFromQueue } from "../../stores/file.store";
import Image from "next/image";
import useDeleteFile from "../../hooks/useDeleteFile";

type Props = {
  file: FileItem;
};

export const FileDropZoneQueueItem = ({ file }: Props) => {
  const removeFileFromQueue = useStoreRemoveFileFromQueue();
  const { mutateAsync: deleteFile } = useDeleteFile();

  return (
    <div className="relative shrink-0 w-32 h-32 rounded-lg border bg-muted/30 overflow-hidden group shadow-sm flex items-center justify-center">
      {file.url ? (
        <Image
          src={file.url}
          alt={file.name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 p-2">
          <FileIcon className="w-8 h-8 text-muted-foreground" />
          <p
            className="text-xs text-center truncate w-full px-2 text-muted-foreground"
            title={file.name}
          >
            {file.name}
          </p>
        </div>
      )}

      {/* Delete Button */}
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          removeFileFromQueue(file.id);
          deleteFile({ id: file.id });
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

