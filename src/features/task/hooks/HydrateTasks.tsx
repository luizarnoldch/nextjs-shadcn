import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ReactNode } from "react";

type HydrateTasksProps = {
  children: ReactNode;
};

const HydrateTasks = async ({ children }: HydrateTasksProps) => {
  prefetch(trpc.task.list.queryOptions());
  return <HydrateClient>{children}</HydrateClient>;
};

export default HydrateTasks;
