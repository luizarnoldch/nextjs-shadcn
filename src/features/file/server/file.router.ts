import { TRPCError } from "@trpc/server";
import {
  createFileSchema,
  updateFileSchema,
  deleteFileSchema,
  getFileSchema,
} from "../schema/file.schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { FileState, FileVisibility } from "@/generated/prisma/enums";

export const fileRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.file.findMany({
        where: {
          deletedAt: null,
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
          state: FileState.PENDING,
          visibility: FileVisibility.PUBLIC,
          uploadedAt: new Date(),
        },
      });
      const key = `file/${file.id}/${file.name}.${file.type}`;
      const presignedUrl = await ctx.s3Client.presignedPutObject(ctx.config.minio.bucketName, key, 60 * 5);

      const updatedFile = await ctx.prisma.file.update({
        where: { id: file.id },
        data: { key },
      });

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
      return await ctx.prisma.file.update({
        where: { id },
        data,
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

