"use client";
import { CategoryProvider } from "@/components/category-provider";
import { PreferencesProvider } from "@/components/preferences-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <PreferencesProvider>
          <CategoryProvider>{children}</CategoryProvider>
        </PreferencesProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
