import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useSuspenseListFiles() {
  const trpc = useTRPC();
  const { data, ...query } = useSuspenseQuery(trpc.file.list.queryOptions());
  return {
    data,
    ...query,
  };
}
