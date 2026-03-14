"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UseDeleteTaskProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useDeleteTask = ({
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: UseDeleteTaskProps = {}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.task.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.task.list.queryOptions());
        onSuccess?.();
        toast.success("Task deleted successfully");
      },
      onError: (error) => {
        onError?.(error);
        toast.error("Failed to delete task");
      },
      onMutate: async () => {
        onMutate?.();
      },
      onSettled: async () => {
        onSettled?.();
      },
    })
  );

  return {
    ...mutation,
  };
};

export default useDeleteTask;
