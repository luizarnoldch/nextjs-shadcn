"use client"

import { ComponentProps, ReactNode } from "react"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { ReactFormExtendedApi, FieldApi } from "@tanstack/react-form"

type FormFieldProps = {
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>
  descriptionLocation?: "top" | "bottom"
  fieldName: string
  label?: ReactNode
  description?: ReactNode
  className?: string
  fieldClassName?: string
  labelClassName?: string
  descriptionClassName?: string
  errorClassName?: string
  children: ((field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>) => ReactNode)
  fieldProps?: ComponentProps<typeof Field>
  labelProps?: ComponentProps<typeof FieldLabel>
  descriptionProps?: ComponentProps<typeof FieldDescription>
  errorProps?: ComponentProps<typeof FieldError>
}

const FormField = ({
  form,
  fieldName,
  label,
  descriptionLocation = "top",
  description,
  className,
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
            className={cn(className, fieldClassName)}
            {...fieldProps}
          >
            {label && (
              <FieldLabel htmlFor={field.name} className={cn(labelClassName)} {...labelProps}>
                {label}
              </FieldLabel>
            )}
            {children(field)}
            {description && descriptionLocation === "top" && (
              <FieldDescription className={cn(descriptionClassName)} {...descriptionProps}>
                {description}
              </FieldDescription>
            )}
            {isInvalid && <FieldError errors={field.state.meta.errors} className={cn(errorClassName)} {...errorProps} />}
            {description && descriptionLocation === "bottom" && (
              <FieldDescription className={cn(descriptionClassName)} {...descriptionProps}>
                {description}
              </FieldDescription>
            )}
          </Field>
        )
      }}
    />
  )
}

export default FormField
