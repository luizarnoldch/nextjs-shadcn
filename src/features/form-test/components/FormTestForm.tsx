"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import useCreateFormTest from "../hooks/useCreateFormTest";
import { TestEnum } from "@/generated/prisma";
import FormField from "@/components/Form/FormField";
import FormSection from "@/components/Form/FormSection";
import FormSubmit from "@/components/Form/FormSubmit";
import { FieldApi } from "@tanstack/react-form";

import dynamic from "next/dynamic";
import EnumSelectSkeleton from "./EnumSelectSkeleton";

const EnumSelectField = dynamic(() => import("./EnumSelect"), {
  ssr: false,
  loading: () => <EnumSelectSkeleton />,
});

const inputCls = "bg-white/5 border-white/10 focus:border-blue-500/50";

type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "enum" | "checkbox" | "textarea" | "json";
  placeholder?: string;
  step?: string;
  className?: string;
};

type FormSectionConfig = {
  legend: string;
  description: string;
  fields: FieldConfig[];
};

const SECTIONS: FormSectionConfig[] = [
  {
    legend: "Form Controls",
    description: "Testing different field types with high-level components",
    fields: [
      { name: "textField", label: "Text Field", type: "text", placeholder: "Enter some text" },
      { name: "numberField", label: "Number Field (Int)", type: "number", placeholder: "Enter an integer" },
      { name: "decimalField", label: "Decimal Field", type: "number", step: "0.01", placeholder: "Enter a decimal" },
      { name: "floatField", label: "Float Field", type: "number", step: "any", placeholder: "Enter a float" },
      { name: "dateField", label: "Date Field", type: "date" },
      { name: "enumField", label: "Enum Field (Select)", type: "enum" },
      { name: "optionalField", label: "Optional Field", type: "text", placeholder: "Maybe enter something" },
      { name: "booleanField", label: "Boolean Field (Checkbox)", type: "checkbox" },
    ],
  },
  {
    legend: "Advanced Content",
    description: "Long text and JSON fields",
    fields: [
      { name: "longTextField", label: "Long Text Field (Textarea)", type: "textarea", placeholder: "Enter long text here..." },
      { name: "jsonField", label: "JSON Field (Textarea)", type: "json", placeholder: '{"key": "value"}' },
    ],
  },
];

export default function FormTestForm() {
  const { form, isPending } = useCreateFormTest();

  const renderFieldInput = (field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>, config: FieldConfig): ReactNode => {
    switch (config.type) {
      case "checkbox":
        return (
          <div className="flex items-center gap-3 h-full">
            <Switch
              id={field.name}
              checked={field.state.value}
              onCheckedChange={field.handleChange}
            />
            <label htmlFor={field.name} className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable Feature
            </label>
          </div>
        );
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${inputCls} ${!field.state.value ? "text-muted-foreground" : ""}`}
              >
                <CalendarIcon className="mr-2 size-4" />
                {field.state.value
                  ? format(new Date(field.state.value), "PPP")
                  : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.state.value ? new Date(field.state.value) : undefined}
                onSelect={(date) => field.handleChange(date ? date.toISOString() : "")}
              />
            </PopoverContent>
          </Popover>
        );
      case "enum":
        return (
          <EnumSelectField
            name={field.name}
            value={field.state.value}
            onValueChange={field.handleChange}
            options={Object.values(TestEnum)}
          />
        );
      case "textarea":
      case "json":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder={config.placeholder}
            className={`${inputCls} ${config.type === "json" ? "font-mono" : ""} ${config.type === "textarea" ? "min-h-[120px]" : ""}`}
          />
        );
      default:
        return (
          <Input
            id={field.name}
            name={field.name}
            type={config.type}
            step={config.step}
            value={config.name === "optionalField" ? (field.state.value || "") : field.state.value}
            onBlur={field.handleBlur}
            onChange={field.handleChange}
            placeholder={config.placeholder}
            className={inputCls}
          />
        );
    }
  };

  return (
    <form
      id="form-test"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl"
    >
      {SECTIONS.map((section) => (
        <FormSection
          key={section.legend}
          legend={section.legend}
          description={section.description}
          fieldgroupClassName="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {section.fields.map((config) => (
            <FormField
              key={config.name}
              form={form}
              fieldName={config.name}
              label={config.label}
            >
              {(field) => renderFieldInput(field, config)}
            </FormField>
          ))}
        </FormSection>
      ))}

      <div className="flex justify-end pt-4">
        <FormSubmit
          form={form}
          formName="form-test"
          isPending={isPending}
          buttonProps={{
            className: "bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
          }}
        />
      </div>
    </form>
  );
}
