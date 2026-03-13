"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { createFileSchema, CreateFileType } from "../schema/file.schema";
import { toast } from "sonner";
import { FileState, FileVisibility } from "@/generated/prisma/enums";

type useCreateFileProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useCreateFile = ({
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: useCreateFileProps = {}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const revalidateFileList = () => {
    queryClient.invalidateQueries(trpc.file.list.queryOptions());
  };

  const mutation = useMutation(
    trpc.file.create.mutationOptions({
      onSuccess: async () => {
        onSuccess?.();
        form.reset();
        toast.success("File created successfully");
      },
      onError: (error) => {
        onError?.(error);
        toast.error("File creation failed");
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

  const form = useForm({
    defaultValues: {
      name: "",
      type: "",
      size: 0,
      state: FileState.PENDING,
      visibility: FileVisibility.PUBLIC,
      key: "",
      url: "",
    } as CreateFileType,
    validators: {
      onChange: createFileSchema,
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
    },
  });

  return {
    ...mutation,
    form,
    revalidateFileList,
  };
};

export default useCreateFile;
