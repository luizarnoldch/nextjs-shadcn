"use client";

import useCreateFile from "../../hooks/useCreateFile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FileFormFields from "./FileFormFields";
import FileFormActions from "./FileFormActions";

export default function FileForm() {
  const { form, isPending } = useCreateFile();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create File</CardTitle>
        <CardDescription>Upload a new file record.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FileFormFields form={form} />
          <FileFormActions form={form} isPending={isPending} />
        </div>
      </CardContent>
    </Card>
  );
}
