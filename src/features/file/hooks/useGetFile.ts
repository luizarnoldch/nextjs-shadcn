import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { GetFileType } from "../schema/file.schema";

export function useGetFile(input: GetFileType) {
  const trpc = useTRPC();
  const { data, ...query } = useQuery(trpc.file.get.queryOptions(input));
  return {
    data,
    ...query,
  };
}
