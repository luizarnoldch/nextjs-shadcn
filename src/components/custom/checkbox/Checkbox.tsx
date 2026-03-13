// components/Checkbox.tsx
import { cn } from "@/lib/utils";
import { FC } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={cn("form-checkbox h-5 w-5 text-blue-600")}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
