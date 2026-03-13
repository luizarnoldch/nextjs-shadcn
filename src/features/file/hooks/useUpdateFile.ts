"use client"

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { updateFileSchema, UpdateFileType } from "../schema/file.schema";
import { toast } from "sonner";

type useUpdateFileProps = {
  file?: UpdateFileType;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useUpdateFile = ({ file, onSuccess, onError, onMutate, onSettled }: useUpdateFileProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const mutation = useMutation(trpc.file.update.mutationOptions({
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries(trpc.file.list.queryOptions());
      onSuccess?.();
      form.reset();
      toast.success("File updated successfully");
    },
    onError: (error, variables) => {
      onError?.(error);
      toast.error("File update failed");
    },
    onMutate: async (variables) => {
      onMutate?.();
      return undefined;
    },
    onSettled: async (data, error, variables) => {
      onSettled?.();
    },
  }));

  const form = useForm({
    defaultValues: {
      id: file?.id || "",
      name: file?.name,
      type: file?.type,
      size: file?.size,
      state: file?.state,
      visibility: file?.visibility,
      key: file?.key,
      url: file?.url,
    } as UpdateFileType,
    validators: {
      onChange: updateFileSchema,
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

export default useUpdateFile;

