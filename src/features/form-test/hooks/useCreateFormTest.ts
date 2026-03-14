"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { createFormTestSchema } from "../schema/form-test.schema";
import { toast } from "sonner";

type UseCreateFormTestProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

const useCreateFormTest = ({
  onSuccess,
  onError,
  onMutate,
  onSettled,
}: UseCreateFormTestProps = {}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    trpc.formTest.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.formTest.list.queryOptions());
        onSuccess?.();
        form.reset();
        toast.success("Form test created successfully");
      },
      onError: (error) => {
        console.error(error);
        onError?.(error);
        toast.error("Failed to create form test");
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
      textField: "",
      numberField: 0,
      decimalField: 0.0,
      floatField: 0.0,
      booleanField: false,
      dateField: "",
      longTextField: "",
      jsonField: "{}",
      enumField: "OPTION_A",
      optionalField: "",
    } as any,
    validators: {
      onChange: createFormTestSchema,
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

export default useCreateFormTest;
