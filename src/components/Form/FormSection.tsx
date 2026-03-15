"use client"

import { ComponentProps, ReactNode } from "react"
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

type FormSectionProps = {
  legend?: ReactNode
  description?: ReactNode
  title?: ReactNode
  descriptionLocation?: "top" | "bottom"
  className?: string
  children: ReactNode
  fieldsetClassName?: string
  fieldsetProps?: ComponentProps<typeof FieldSet>
  fieldlegendClassName?: string
  fieldlegendProps?: ComponentProps<typeof FieldLegend>
  fieldTitleClassName?: string
  fieldTitleProps?: ComponentProps<typeof FieldTitle>
  fieldgroupClassName?: string
  fieldgroupProps?: ComponentProps<typeof FieldGroup>
  fielddescriptionClassName?: string
  fielddescriptionProps?: ComponentProps<typeof FieldDescription>
}

const FormSection = ({
  legend,
  description,
  descriptionLocation = "top",
  children,
  className,
  title,
  fieldTitleClassName,
  fieldTitleProps,
  fieldsetClassName,
  fieldgroupClassName,
  fieldsetProps,
  fieldgroupProps,
  fieldlegendClassName,
  fieldlegendProps,
  fielddescriptionClassName,
  fielddescriptionProps,
}: FormSectionProps) => {
  return (
    <FieldSet className={cn(className, fieldsetClassName)} {...fieldsetProps}>
      {legend && (
        <FieldLegend className={cn(fieldlegendClassName)} {...fieldlegendProps}>
          {legend}
        </FieldLegend>
      )}
      {title && (
        <FieldTitle className={cn(fieldTitleClassName)} {...fieldTitleProps}>
          {title}
        </FieldTitle>
      )}
      {description && descriptionLocation === "top" && (
        <FieldDescription className={cn(fielddescriptionClassName)} {...fielddescriptionProps}>
          {description}
        </FieldDescription>
      )}
      <FieldGroup className={cn(fieldgroupClassName)} {...fieldgroupProps}>{children}</FieldGroup>
      {description && descriptionLocation === "bottom" && (
        <FieldDescription className={cn(fielddescriptionClassName)} {...fielddescriptionProps}>
          {description}
        </FieldDescription>
      )}
    </FieldSet>
  )
}

export default FormSection
