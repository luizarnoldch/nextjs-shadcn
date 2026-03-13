"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FileFormFieldsProps = {
  form: any; // Type comes from @tanstack/react-form
};

export default function FileFormFields({ form }: FileFormFieldsProps) {
  return (
    <div className="space-y-4">
      <form.Field name="fileName">
        {(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>File Name</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="document.pdf"
            />
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="fileType">
        {(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>File Type</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="application/pdf"
            />
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="fileSize">
        {(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>File Size (bytes)</Label>
            <Input
              id={field.name}
              type="number"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              placeholder="1024"
            />
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="fileUrl">
        {(field: any) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>File URL</Label>
            <Input
              id={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="https://example.com/file.pdf"
            />
            {field.state.meta.errors ? (
              <p className="text-sm font-medium text-destructive">
                {field.state.meta.errors.join(", ")}
              </p>
            ) : null}
          </div>
        )}
      </form.Field>
    </div>
  );
}
