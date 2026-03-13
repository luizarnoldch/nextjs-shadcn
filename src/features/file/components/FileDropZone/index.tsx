"use client";

import { useEffect } from "react";
import { useStoreAddFilesToQueue } from "../../stores/file.store";

import { FileDropZoneArea } from "./FileDropZoneArea";
import { FileDropZoneQueue } from "./FileDropZoneQueue";
import { useListFiles } from "../../hooks/useListFiles";
import FileDropZoneSaveButton from "./FileDropZoneSaveButton";

const FileDropZone = () => {
  const { data: files } = useListFiles();
  const addFilesToQueue = useStoreAddFilesToQueue();

  useEffect(() => {
    if (files && files.length > 0) {
      addFilesToQueue(files);
    }
  }, [files, addFilesToQueue]);

  return (
    <div className="w-full space-y-4">
      <FileDropZoneArea />
      <FileDropZoneQueue />
      <FileDropZoneSaveButton />
    </div>
  );
};

export default FileDropZone;

