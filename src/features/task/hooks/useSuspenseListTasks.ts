"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useSuspenseListTasks() {
  const trpc = useTRPC();
  const { data, ...query } = useSuspenseQuery(trpc.task.list.queryOptions());
  return {
    data,
    ...query,
  };
}
