import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ReactNode } from "react";

type HydrateFilesProps = {
  children: ReactNode;
};

const HydrateFiles = async ({ children }: HydrateFilesProps) => {
  await prefetch(trpc.file.list.queryOptions());
  return <HydrateClient>{children}</HydrateClient>;
};

export default HydrateFiles;
