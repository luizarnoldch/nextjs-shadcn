"use client";

import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreateTask from "../hooks/useCreateTask";

export default function TaskForm() {
  const { form, isPending } = useCreateTask();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <form.Field
          name="title"
          children={(field) => (
            <Field className="flex-1">
              <FieldLabel>New Task</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="What needs to be done?"
                  className="bg-white/10 border-white/20 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError
                errors={field.state.meta.errors.map((e) => ({
                  message: e?.toString(),
                }))}
              />
            </Field>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-[40px] mt-8"
        >
          {isPending ? "Creating..." : "Add Task"}
        </Button>
      </div>
    </form>
  );
}
