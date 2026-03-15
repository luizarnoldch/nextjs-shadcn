import { TRPCError } from "@trpc/server";
import {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  getTaskSchema,
} from "../schema/task.schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const taskRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.task.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list tasks",
      });
    }
  }),
  get: baseProcedure.input(getTaskSchema).query(async ({ input, ctx }) => {
    try {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });
      if (!task || task.deletedAt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found",
        });
      }
      return task;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get task",
      });
    }
  }),
  create: baseProcedure.input(createTaskSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.task.create({
        data: input,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create task",
      });
    }
  }),
  update: baseProcedure.input(updateTaskSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, ...data } = input;
      return await ctx.prisma.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update task",
      });
    }
  }),
  delete: baseProcedure.input(deleteTaskSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.task.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete task",
      });
    }
  }),
});
