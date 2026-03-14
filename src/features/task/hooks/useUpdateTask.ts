"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { updateTaskSchema, UpdateTaskType } from "../schema/task.schema";
import { toast } from "sonner";

type UseUpdateTaskProps = {
  task: { id: string; title: string };
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useUpdateTask = ({
  task,
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: UseUpdateTaskProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.task.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.task.list.queryOptions());
        onSuccess?.();
        toast.success("Task updated successfully");
      },
      onError: (error) => {
        onError?.(error);
        toast.error("Failed to update task");
      },
      onMutate: async () => {
        onMutate?.();
      },
      onSettled: async () => {
        onSettled?.();
      },
    })
  );

  const form = useForm({
    defaultValues: {
      id: task.id,
      title: task.title,
    } as UpdateTaskType,
    validators: {
      onChange: updateTaskSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return {
    form,
    ...mutation,
  };
};

export default useUpdateTask;
