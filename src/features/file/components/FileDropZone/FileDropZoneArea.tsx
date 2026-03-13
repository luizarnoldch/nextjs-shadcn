"use client";

import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFileDropZone } from "../../hooks/useFileDropZone";

const FileDropZoneArea = () => {
  const { getRootProps, getInputProps, isDragActive } = useFileDropZone();
  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
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

export default FileDropZoneArea;
