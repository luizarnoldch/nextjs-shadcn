"use client";

import React, { useCallback } from "react";
import { UploadCloud, X, File as FileIcon, Image as ImageIcon } from "lucide-react";
import { useFileQueue } from "@/hooks/use-file-queue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

type Props = {
  // We allow passing an optional initial hook interface
  // so a parent component can govern the queue if needed.
  // Otherwise, FileDropZone manages its own queue.
  queueManager?: ReturnType<typeof useFileQueue>;
};

const FileDropZone = ({ queueManager }: Props) => {
  const localQueueManager = useFileQueue();
  const { queue, addLocalFiles, removeFile, isDeleting } = queueManager || localQueueManager;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        addLocalFiles(acceptedFiles);
      }
    },
    [addLocalFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="w-full space-y-4">
      {/* Dropzone Area */}
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

      {/* Queue Preview Area */}
      {queue.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Queued Files ({queue.length})</h3>
          <div className="flex flex-row gap-4 overflow-x-auto pb-4 custom-scrollbar">
            {queue.map((file) => {
              const isImage =
                file.type === "local"
                  ? file.file.type.startsWith("image/")
                  // Naive check for remote files
                  : !!file.url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);

              const isLoading = isDeleting[file.id];

              return (
                <div
                  key={file.id}
                  className="relative shrink-0 w-32 h-32 rounded-lg border bg-muted/30 overflow-hidden group shadow-sm flex items-center justify-center"
                >
                  {isImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.type === "local" ? file.previewUrl : file.url}
                      alt={file.type === "local" ? file.file.name : "Remote File"}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-2">
                      <FileIcon className="w-8 h-8 text-muted-foreground" />
                      {file.type === "local" && (
                        <p className="text-xs text-center truncate w-full px-2 text-muted-foreground" title={file.file.name}>
                          {file.file.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Delete Button */}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {isLoading && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropZone;