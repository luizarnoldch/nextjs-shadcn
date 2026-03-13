import { TRPCError } from "@trpc/server";
import {
  createFileSchema,
  updateFileSchema,
  deleteFileSchema,
  getFileSchema,
} from "../schema/file.schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { FileState, FileVisibility } from "@/generated/prisma/enums";
import { sanitizeFileName } from "@/lib/utils";

export const fileRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.file.findMany({
        where: {
          deletedAt: null,
          // state: FileState.UPLOADED,
        },
        orderBy: {
          uploadedAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch files",
        cause: error,
      });
    }
  }),
  get: baseProcedure.input(getFileSchema).query(async ({ input, ctx }) => {
    try {
      const file = await ctx.prisma.file.findUnique({
        where: { id: input.id },
      });
      if (!file) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "File not found",
        });
      }
      return file;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch file",
        cause: error,
      });
    }
  }),
  create: baseProcedure.input(createFileSchema).mutation(async ({ input, ctx }) => {
    try {
      const file = await ctx.prisma.file.create({
        data: {
          ...input,
          name: sanitizeFileName(input.name),
          state: FileState.PENDING,
          visibility: FileVisibility.PUBLIC,
          uploadedAt: new Date(),
        },
      });
      const key = `file/${file.id}.${input.type.split("/").pop()}`;
      const updatedFile = await ctx.prisma.file.update({
        where: { id: file.id },
        data: { key },
      });
      const presignedUrl = await ctx.s3Client.presignedPutObject(ctx.config.minio.bucketName, key, 60 * 5);
      return { ...updatedFile, presignedUrl };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create file",
        cause: error,
      });
    }
  }),
  update: baseProcedure.input(updateFileSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, ...data } = input;

      const currentData: any = { ...data };

      if (data.visibility === FileVisibility.PUBLIC && data.key) {
        const { bucketName, serverUrl, port } = ctx.config.minio
        currentData.url = `http://${serverUrl}:${port}/${bucketName}/${data.key}`
      }

      return await ctx.prisma.file.update({
        where: { id },
        data: currentData,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update file",
        cause: error,
      });
    }
  }),
  delete: baseProcedure.input(deleteFileSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.file.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          state: FileState.DELETED,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete file",
        cause: error,
      });
    }
  }),
});

