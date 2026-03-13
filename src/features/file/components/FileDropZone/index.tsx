"use client";

import FileDropZoneArea from './FileDropZoneArea';
import FileDropZoneQueue from './FileDropZoneQueue';
import FileDropZoneSaveButton from './FileDropZoneSaveButton';

const FileDropZone = () => {
  return (
    <div className="w-full space-y-4">
      <FileDropZoneArea />
      <FileDropZoneQueue />
      <FileDropZoneSaveButton />
    </div>
  );
};

export default FileDropZone;