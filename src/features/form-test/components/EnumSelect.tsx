// features/form-test/components/EnumSelect.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EnumSelectProps = {
  name: string;
  value: string;
  onValueChange: (val: string) => void;
  options: string[];
};

export default function EnumSelect({ name, value, onValueChange, options }: EnumSelectProps) {
  return (
    <Select name={name} value={value} onValueChange={onValueChange} defaultValue={options[0]}>
      <SelectTrigger id={name} className="bg-white/5 border-white/10 w-full">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((val) => (
          <SelectItem key={val} value={val}>
            {val}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}