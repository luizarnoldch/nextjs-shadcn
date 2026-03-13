import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/[^a-zA-Z0-9]/g, "_");
}