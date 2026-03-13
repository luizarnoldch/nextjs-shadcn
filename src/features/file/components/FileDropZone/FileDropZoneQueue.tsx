"use client";

import { FileDropZoneQueueItem } from "./FileDropZoneQueueItem";
import { useFileDropZone } from "../../hooks/useFileDropZone";

const FileDropZoneQueue = () => {
  const { queue } = useFileDropZone();
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
