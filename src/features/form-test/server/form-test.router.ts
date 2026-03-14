import { TRPCError } from "@trpc/server";
import {
  createFormTestSchema,
  updateFormTestSchema,
  deleteFormTestSchema,
  getFormTestSchema,
} from "../schema/form-test.schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const formTestRouter = createTRPCRouter({
  list: baseProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.formTest.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list form tests",
      });
    }
  }),
  get: baseProcedure.input(getFormTestSchema).query(async ({ input, ctx }) => {
    try {
      const formTest = await ctx.prisma.formTest.findUnique({
        where: { id: input.id },
      });
      if (!formTest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Form test session not found",
        });
      }
      return formTest;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get form test",
      });
    }
  }),
  create: baseProcedure.input(createFormTestSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.formTest.create({
        data: {
          ...input,
          jsonField: input.jsonField ? JSON.parse(input.jsonField as string) : {},
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create form test",
      });
    }
  }),
  update: baseProcedure.input(updateFormTestSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, ...data } = input;
      return await ctx.prisma.formTest.update({
        where: { id },
        data: {
          ...data,
          jsonField: data.jsonField ? JSON.parse(data.jsonField as string) : undefined,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update form test",
      });
    }
  }),
  delete: baseProcedure.input(deleteFormTestSchema).mutation(async ({ input, ctx }) => {
    try {
      return await ctx.prisma.formTest.delete({
        where: { id: input.id },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete form test",
      });
    }
  }),
});
