import * as React from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

export interface FormFieldProps extends React.ComponentProps<typeof Field> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | string[] | { message?: string } | { message?: string }[]
  htmlFor?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
}

export function FormField({
  label,
  description,
  error,
  htmlFor,
  children,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  orientation = "vertical",
  ...props
}: FormFieldProps) {
  const errors = Array.isArray(error)
    ? error.map((e) => (typeof e === "string" ? { message: e } : e))
    : typeof error === "string"
      ? [{ message: error }]
      : error && "message" in error
        ? [error]
        : undefined

  return (
    <Field
      orientation={orientation}
      className={cn(className)}
      {...props}
    >
      {label && (
        <FieldLabel htmlFor={htmlFor} className={cn(labelClassName)}>
          {label}
        </FieldLabel>
      )}
      {children}
      {description && (
        <FieldDescription className={cn(descriptionClassName)}>
          {description}
        </FieldDescription>
      )}
      {errors && <FieldError errors={errors} className={cn(errorClassName)} />}
    </Field>
  )
}