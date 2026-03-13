"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useStoreFileQueue, useStoreRemoveFileFromQueue } from '../../stores/file.store'
import { FileState, FileVisibility } from '@/generated/prisma/enums'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import useUpdateFile from '../../hooks/useUpdateFile'

const FileDropZoneSaveButton = () => {
  const queue = useStoreFileQueue()
  const removeFromQueue = useStoreRemoveFileFromQueue()
  const { mutateAsync: updateFileAsync } = useUpdateFile()
  const [isSaving, setIsSaving] = useState(false)
  const uploadableFiles = queue.filter(item => item.origin === 'local' && !!item.file && !!item.presignURL);

  const handleSave = async () => {
    if (uploadableFiles.length === 0) return
    setIsSaving(true)
    try {
      const uploadPromises = uploadableFiles.map(async (item) => {
        if (!item.presignURL || !item.file) {
          console.warn(`File ${item.name} is missing presigned URL or file object`)
          return
        }
        const response = await fetch(item.presignURL, {
          method: 'PUT',
          body: item.file,
          headers: {
            'Content-Type': item.type,
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${item.name}`)
        }
        await updateFileAsync({
          id: item.id,
          key: item.key,
          visibility: FileVisibility.PUBLIC,
          state: FileState.UPLOADED,
        })
        removeFromQueue(item.id)
      })

      await Promise.all(uploadPromises)

      toast.success('All files uploaded and saved successfully')
    } catch (error) {
      console.error('Save failed:', error)
      toast.error('Failed to save some files. Please check the console for details.')
    } finally {
      setIsSaving(false)
    }
  }

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
  )
}

export default FileDropZoneSaveButton