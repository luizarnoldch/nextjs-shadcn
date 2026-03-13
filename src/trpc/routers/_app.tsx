import { baseProcedure, createTRPCRouter } from "../init";
import { fileRouter } from "@/features/file/server/file.router";

export const appRouter = createTRPCRouter({
  healthcheck: baseProcedure.query(() => {
    return {
      message: `tRPC backend is Healthy`,
    };
  }),
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
