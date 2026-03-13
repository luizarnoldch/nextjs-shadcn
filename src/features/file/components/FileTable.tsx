"use client";

import { useSuspenseListFiles } from "../hooks/useSuspenseListFiles";
import useDeleteFile from "../hooks/useDeleteFile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function FileTable() {
  const { data: files } = useSuspenseListFiles();
  const deleteFile = useDeleteFile();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      await deleteFile.mutateAsync({ id });
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size (bytes)</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Uploaded At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No files found
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.fileName}</TableCell>
                <TableCell>{file.fileType}</TableCell>
                <TableCell>{file.fileSize}</TableCell>
                <TableCell>{file.state}</TableCell>
                <TableCell>{format(new Date(file.uploadedAt), "MMM d, yyyy")}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    disabled={deleteFile.isPending}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
