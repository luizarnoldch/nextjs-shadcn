// types/NavItem.ts
import { LucideIcon } from "lucide-react";

export interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isOpen?: boolean;
}

export interface ToggleNavProps {
  isOpen: boolean;
}
