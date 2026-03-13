import config from "@/lib/config";
import s3Client from "@/lib/minio";
import prisma from "@/lib/prisma";
import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC
  // .context<Awaited<ReturnType<typeof createTRPCContext>>>()
  .create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson,
  });
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  return next({ ctx: { ...ctx, prisma: prisma, s3Client: s3Client, config: config } });
});

// export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   if (!session) {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
//   }
//   return next({ ctx: { ...ctx, auth: session } });
// });
