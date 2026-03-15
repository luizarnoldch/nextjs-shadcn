"use client"

import { ComponentProps, ReactNode } from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { ReactFormExtendedApi } from "@tanstack/react-form"

type FormFieldProps = {
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>
  fieldName: string
  label?: ReactNode
  description?: ReactNode
  htmlFor?: string
  fieldClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  children: ReactNode
  fieldProps?: ComponentProps<typeof Field>
  labelProps?: ComponentProps<typeof FieldLabel>
  descriptionProps?: ComponentProps<typeof FieldDescription>
  errorProps?: ComponentProps<typeof FieldError>
}

const FormField = ({
  form,
  fieldName,
  label,
  description,
  htmlFor,
  children,
  fieldClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  fieldProps,
  labelProps,
  descriptionProps,
  errorProps,
}: FormFieldProps) => {
  return (
    <form.Field
      name={fieldName}
      children={(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field
            className={cn(fieldClassName)}
            {...fieldProps}
          >
            {label && (
              <FieldLabel htmlFor={htmlFor} className={cn(labelClassName)} {...labelProps}>
                {label}
              </FieldLabel>
            )}
            {children}
            {description && (
              <FieldDescription className={cn(descriptionClassName)} {...descriptionProps}>
                {description}
              </FieldDescription>
            )}
            {isInvalid && <FieldError errors={field.state.meta.errors} className={cn(errorClassName)} {...errorProps} />}
          </Field>
        )
      }}
    />
  )
}

export default FormField
