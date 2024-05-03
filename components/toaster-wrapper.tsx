"use client"

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function ToasterWrapper() {
  const theme = useTheme();
  return (
    <Toaster
      theme={theme.resolvedTheme as "light" | "dark" | "system" | undefined}
    />
  );
}