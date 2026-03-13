import { z } from "zod";
import { FileState, FileVisibility } from "@/generated/prisma/enums";

const fileStateEnum = z.enum([
  FileState.PENDING,
  FileState.UPLOADED,
  FileState.DELETED,
]);

const fileVisibilityEnum = z.enum([
  FileVisibility.PUBLIC,
  FileVisibility.PRIVATE,
]);

export const fileSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  type: z.string(),
  size: z.number().int(),
  state: fileStateEnum,
  visibility: fileVisibilityEnum,
  key: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  uploadedAt: z.date(),
  deletedAt: z.date().nullable().optional(),
});

export const createFileSchema = fileSchema.omit({
  id: true,
  uploadedAt: true,
  deletedAt: true,
});

export const updateFileSchema = fileSchema
  .pick({
    name: true,
    type: true,
    size: true,
    state: true,
    visibility: true,
    key: true,
    url: true,
    deletedAt: true,
  })
  .partial()
  .extend({
    id: z.uuid(),
  });

export const deleteFileSchema = fileSchema.pick({ id: true });
export const getFileSchema = fileSchema.pick({ id: true });

export type FileType = z.infer<typeof fileSchema>;
export type CreateFileType = z.infer<typeof createFileSchema>;
export type UpdateFileType = z.infer<typeof updateFileSchema>;
export type DeleteFileType = z.infer<typeof deleteFileSchema>;
export type GetFileType = z.infer<typeof getFileSchema>;
