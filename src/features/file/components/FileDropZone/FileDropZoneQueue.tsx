"use client";

import { useMemo } from "react";
import { useListFiles } from '../../hooks/useListFiles';
import { useMergedQueue, FileItem } from '../../stores/file.store';
import { FileDropZoneQueueItem } from "./FileDropZoneQueueItem";

const FileDropZoneQueue = () => {
  const { data: files } = useListFiles();

  const remoteFiles = useMemo<FileItem[]>(
    () =>
      files?.map((file) => ({
        ...file,
        origin: "remote" as const,
        url: file.url || "",
      })) ?? [],
    [files]
  );

  const queue = useMergedQueue(remoteFiles);

  if (queue.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Queued Files ({queue.length})</h3>
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {queue.map((file) => (
          <FileDropZoneQueueItem key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FileDropZoneQueue;