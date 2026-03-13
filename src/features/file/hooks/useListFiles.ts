import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export function useListFiles() {
  const trpc = useTRPC();
  const { data, ...query } = useQuery(trpc.file.list.queryOptions());
  return {
    data,
    ...query,
  };
}
