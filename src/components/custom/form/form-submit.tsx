"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import React, { Children } from "react";

type ShadCnButtonVariants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ShadCnButtonSizes = "default" | "sm" | "lg" | "icon" | null | undefined;

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  size?: ShadCnButtonSizes;
  variant?: ShadCnButtonVariants;
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  size = "sm",
  variant,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={size}
      className={cn("", className)}
    >
      {children}
    </Button>
  );
};
