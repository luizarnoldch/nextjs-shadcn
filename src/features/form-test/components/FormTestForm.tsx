"use client";

import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import useCreateFormTest from "../hooks/useCreateFormTest";
import { TestEnum } from "@/generated/prisma";

import dynamic from "next/dynamic";
import EnumSelectSkeleton from "./EnumSelectSkeleton";

const EnumSelectField = dynamic(() => import("./EnumSelect"), {
  ssr: false,
  loading: () => <EnumSelectSkeleton />,
});

export default function FormTestForm() {
  const { form, isPending } = useCreateFormTest();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text Field */}
        <form.Field
          name="textField"
          children={(field) => (
            <Field>
              <FieldLabel>Text Field</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter some text"
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Number Field */}
        <form.Field
          name="numberField"
          children={(field) => (
            <Field>
              <FieldLabel>Number Field (Int)</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="Enter an integer"
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Decimal Field */}
        <form.Field
          name="decimalField"
          children={(field) => (
            <Field>
              <FieldLabel>Decimal Field</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="0.01"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="Enter a decimal"
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Float Field */}
        <form.Field
          name="floatField"
          children={(field) => (
            <Field>
              <FieldLabel>Float Field</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step="any"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="Enter a float"
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Date Field */}
        <form.Field
          name="dateField"
          children={(field) => (
            <Field>
              <FieldLabel>Date Field</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Enum Field */}
        <form.Field
          name="enumField"
          children={(field) => (
            <Field className="w-full">
              <FieldLabel htmlFor={field.name}>Enum Field (Select)</FieldLabel>
              <FieldContent>
                <EnumSelectField
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val)}
                  options={Object.values(TestEnum)}
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Optional Field */}
        <form.Field
          name="optionalField"
          children={(field) => (
            <Field>
              <FieldLabel>Optional Field</FieldLabel>
              <FieldContent>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Maybe enter something"
                  className="bg-white/5 border-white/10 focus:border-blue-500/50"
                />
              </FieldContent>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />

        {/* Boolean Field */}
        <form.Field
          name="booleanField"
          children={(field) => (
            <Field className="flex flex-row items-center gap-2 space-y-0 pt-8">
              <FieldContent>
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
              </FieldContent>
              <FieldLabel htmlFor={field.name} className="cursor-pointer">Boolean Field (Checkbox)</FieldLabel>
              <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
            </Field>
          )}
        />
      </div>

      {/* Long Text Field */}
      <form.Field
        name="longTextField"
        children={(field) => (
          <Field>
            <FieldLabel>Long Text Field (Textarea)</FieldLabel>
            <FieldContent>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter long text here..."
                className="bg-white/5 border-white/10 focus:border-blue-500/50 min-h-[120px]"
              />
            </FieldContent>
            <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
          </Field>
        )}
      />

      {/* JSON Field */}
      <form.Field
        name="jsonField"
        children={(field) => (
          <Field>
            <FieldLabel>JSON Field (Textarea)</FieldLabel>
            <FieldContent>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='{"key": "value"}'
                className="bg-white/5 border-white/10 focus:border-blue-500/50 font-mono"
              />
            </FieldContent>
            <FieldError errors={field.state.meta.errors.map((e) => ({ message: e?.toString() }))} />
          </Field>
        )}
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
        >
          {isPending ? "Testing..." : "Submit Test Form"}
        </Button>
      </div>
    </form>
  );
}
