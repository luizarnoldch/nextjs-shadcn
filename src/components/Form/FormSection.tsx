import * as React from "react"
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

export interface FormSectionProps
  extends Omit<React.ComponentProps<"fieldset">, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  legendVariant?: "legend" | "label"
  titleClassName?: string
  descriptionClassName?: string
  groupClassName?: string
}

export function FormSection({
  title,
  description,
  legendVariant = "legend",
  children,
  className,
  titleClassName,
  descriptionClassName,
  groupClassName,
  ...props
}: FormSectionProps) {
  return (
    <FieldSet className={cn(className)} {...props}>
      {title && (
        <FieldLegend variant={legendVariant} className={cn(titleClassName)}>
          {title}
        </FieldLegend>
      )}
      {description && (
        <FieldDescription className={cn(descriptionClassName)}>
          {description}
        </FieldDescription>
      )}
      <FieldGroup className={cn(groupClassName)}>{children}</FieldGroup>
    </FieldSet>
  )
}
