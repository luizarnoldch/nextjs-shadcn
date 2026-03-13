"use client";

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useListFiles } from '../../hooks/useListFiles';
import { useMergedQueue, useStoreRemoveFileFromQueue, FileItem } from '../../stores/file.store';
import { FileState } from '@/generated/prisma/enums';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import useUpdateFile from '../../hooks/useUpdateFile';

const FileDropZoneSaveButton = () => {
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
  const removeFileFromQueue = useStoreRemoveFileFromQueue();
  const { mutateAsync: updateFileAsync, revalidateFileList } = useUpdateFile();
  const [isSaving, setIsSaving] = useState(false);

  const uploadableFiles = queue.filter(
    (item) => item.origin === 'local' && !!item.file && !!item.presignURL
  );

  const handleSave = async () => {
    if (uploadableFiles.length === 0) return;
    setIsSaving(true);
    try {
      await Promise.all(
        uploadableFiles.map(async (item) => {
          if (!item.presignURL || !item.file) {
            console.warn(`File ${item.name} is missing presigned URL or file object`);
            return;
          }
          const response = await fetch(item.presignURL, {
            method: 'PUT',
            body: item.file,
            headers: { 'Content-Type': item.type },
          });
          if (!response.ok) throw new Error(`Failed to upload ${item.name}`);

          await updateFileAsync({
            id: item.id,
            key: item.key,
            visibility: item.visibility,
            state: FileState.UPLOADED,
          });
          removeFileFromQueue(item.id);
        })
      );
      revalidateFileList();
      toast.success('All files uploaded and saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save some files. Please check the console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving || uploadableFiles.length === 0}
      className="w-full"
    >
      {isSaving ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Files ({uploadableFiles.length})
        </>
      )}
    </Button>
  );
};

export default FileDropZoneSaveButton;