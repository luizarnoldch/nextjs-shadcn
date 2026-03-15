import * as React from "react"
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

type FormSectionProps = {
  legend?: React.ReactNode
  description?: React.ReactNode
  fieldgroupClassName?: string
  fieldgroupProps?: React.ComponentProps<typeof FieldGroup>
  children: React.ReactNode
  fieldsetClassName?: string
  fieldsetProps?: React.ComponentProps<typeof FieldSet>
  fieldlegendClassName?: string
  fieldlegendProps?: React.ComponentProps<typeof FieldLegend>
  fielddescriptionClassName?: string
  fielddescriptionProps?: React.ComponentProps<typeof FieldDescription>
}

const FormSection = ({
  legend,
  description,
  children,
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
    <FieldSet className={cn(fieldsetClassName)} {...fieldsetProps}>
      {legend && (
        <FieldLegend className={cn(fieldlegendClassName)} {...fieldlegendProps}>
          {legend}
        </FieldLegend>
      )}
      {description && (
        <FieldDescription className={cn(fielddescriptionClassName)} {...fielddescriptionProps}>
          {description}
        </FieldDescription>
      )}
      <FieldGroup className={cn(fieldgroupClassName)} {...fieldgroupProps}>{children}</FieldGroup>
    </FieldSet>
  )
}

export default FormSection
