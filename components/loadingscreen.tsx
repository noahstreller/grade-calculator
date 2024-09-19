"use client";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useSession } from "next-auth/react";

export function LoadingScreen() {
  const session = useSession();

  return (
    session.status === "loading" && (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <div className="items-center gap-8 flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl">
            Grade
            <br />
            Calculator
          </h1>
          <LoadingSpinner size="50" />
        </div>
      </div>
    )
  );
}
