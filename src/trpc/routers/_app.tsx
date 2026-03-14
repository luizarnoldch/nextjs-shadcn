import { baseProcedure, createTRPCRouter } from "../init";
import { fileRouter } from "@/features/file/server/file.router";
import { taskRouter } from "@/features/task/server/task.router";
import { formTestRouter } from "@/features/form-test/server/form-test.router";

export const appRouter = createTRPCRouter({
  healthcheck: baseProcedure.query(() => {
    return {
      message: `tRPC backend is Healthy`,
    };
  }),
  file: fileRouter,
  task: taskRouter,
  formTest: formTestRouter,
});

export type AppRouter = typeof appRouter;
