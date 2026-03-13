"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type useDeleteFileProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useDeleteFile = ({
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: useDeleteFileProps = {}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const revalidateFileList = () => {
    queryClient.invalidateQueries(trpc.file.list.queryOptions());
  };

  const mutation = useMutation(
    trpc.file.delete.mutationOptions({
      onSuccess: async () => {
        onSuccess?.();
        toast.success("File deleted successfully");
      },
      onError: (error) => {
        onError?.(error);
        toast.error("File deletion failed");
      },
      onMutate: async () => {
        onMutate?.();
        return undefined;
      },
      onSettled: async () => {
        onSettled?.();
      },
    }),
  );

  return {
    ...mutation,
    revalidateFileList,
  };
};

export default useDeleteFile;
