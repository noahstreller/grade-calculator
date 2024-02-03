import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    let truncated = text.substring(0, maxLength - 3) + '...';
    return {text: truncated, truncated: true}
  } else {
    return {text: text, truncated: false};
  }
}