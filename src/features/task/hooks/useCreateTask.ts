"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { createTaskSchema, CreateTaskType } from "../schema/task.schema";
import { toast } from "sonner";

type UseCreateTaskProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useCreateTask = ({
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: UseCreateTaskProps = {}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.task.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.task.list.queryOptions());
        onSuccess?.();
        form.reset();
        toast.success("Task created successfully");
      },
      onError: (error) => {
        onError?.(error);
        toast.error("Failed to create task");
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
      title: "",
    } as CreateTaskType,
    validators: {
      onChange: createTaskSchema,
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

export default useCreateTask;
