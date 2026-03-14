"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function useListTasks() {
  const trpc = useTRPC();
  const { data, ...query } = useQuery(trpc.task.list.queryOptions());
  return {
    data,
    ...query,
  };
}
