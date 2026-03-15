"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import useCreateFormTest from "../hooks/useCreateFormTest";
import { TestEnum } from "@/generated/prisma";
import { FormField } from "@/components/Form/FormField";
import { FormSection } from "@/components/Form/FormSection";

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
      <FormSection
        title="Form Controls"
        description="Testing different field types with high-level components"
        groupClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Text Field */}
        <form.Field
          name="textField"
          children={(field) => (
            <FormField
              label="Text Field"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter some text"
                className="bg-white/5 border-white/10 focus:border-blue-500/50"
              />
            </FormField>
          )}
        />

        {/* Number Field */}
        <form.Field
          name="numberField"
          children={(field) => (
            <FormField
              label="Number Field (Int)"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
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
            </FormField>
          )}
        />

        {/* Decimal Field */}
        <form.Field
          name="decimalField"
          children={(field) => (
            <FormField
              label="Decimal Field"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
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
            </FormField>
          )}
        />

        {/* Float Field */}
        <form.Field
          name="floatField"
          children={(field) => (
            <FormField
              label="Float Field"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
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
            </FormField>
          )}
        />

        {/* Date Field */}
        <form.Field
          name="dateField"
          children={(field) => (
            <FormField
              label="Date Field"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Input
                id={field.name}
                name={field.name}
                type="date"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="bg-white/5 border-white/10 focus:border-blue-500/50"
              />
            </FormField>
          )}
        />

        {/* Enum Field */}
        <form.Field
          name="enumField"
          children={(field) => (
            <FormField
              label="Enum Field (Select)"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <EnumSelectField
                name={field.name}
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
                options={Object.values(TestEnum)}
              />
            </FormField>
          )}
        />

        {/* Optional Field */}
        <form.Field
          name="optionalField"
          children={(field) => (
            <FormField
              label="Optional Field"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Maybe enter something"
                className="bg-white/5 border-white/10 focus:border-blue-500/50"
              />
            </FormField>
          )}
        />

        {/* Boolean Field */}
        <form.Field
          name="booleanField"
          children={(field) => (
            <FormField
              orientation="horizontal"
              className="pt-8"
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked === true)}
              />
              <label htmlFor={field.name} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Boolean Field (Checkbox)
              </label>
            </FormField>
          )}
        />
      </FormSection>

      <FormSection title="Advanced Content" description="Long text and JSON fields">
        {/* Long Text Field */}
        <form.Field
          name="longTextField"
          children={(field) => (
            <FormField
              label="Long Text Field (Textarea)"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter long text here..."
                className="bg-white/5 border-white/10 focus:border-blue-500/50 min-h-[120px]"
              />
            </FormField>
          )}
        />

        {/* JSON Field */}
        <form.Field
          name="jsonField"
          children={(field) => (
            <FormField
              label="JSON Field (Textarea)"
              htmlFor={field.name}
              error={field.state.meta.errors.map((e) => e?.toString()).filter(Boolean) as string[]}
            >
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='{"key": "value"}'
                className="bg-white/5 border-white/10 focus:border-blue-500/50 font-mono"
              />
            </FormField>
          )}
        />
      </FormSection>

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
