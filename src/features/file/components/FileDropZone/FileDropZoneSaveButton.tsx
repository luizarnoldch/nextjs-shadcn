"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useFileDropZone } from "../../hooks/useFileDropZone";

const FileDropZoneSaveButton = () => {
  const { uploadableCount, isCreating, isDeleting, isUpdating, handleSave } =
    useFileDropZone();
  return (
    <Button
      onClick={handleSave}
      disabled={isCreating || isDeleting || isUpdating || uploadableCount === 0}
      className="w-full"
    >
      {isCreating || isDeleting || isUpdating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          Save Files ({uploadableCount})
        </>
      )}
    </Button>
  );
};

export default FileDropZoneSaveButton;
