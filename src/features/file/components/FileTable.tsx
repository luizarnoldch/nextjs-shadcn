"use client";

import { useSuspenseListFiles } from "../hooks/useSuspenseListFiles";
import useDeleteFile from "../hooks/useDeleteFile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { File as FileIcon } from "lucide-react";

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
            <TableHead>Image</TableHead>
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
                <TableCell>
                  {file.url ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
                      <FileIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.state}</TableCell>
                <TableCell>
                  {format(new Date(file.uploadedAt), "MMM d, yyyy")}
                </TableCell>
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
