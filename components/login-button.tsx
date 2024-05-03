"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton({children = "Sign in", className = ""}: {children?: React.ReactNode, className?: string}) {
  const session = useSession();

  return (
    <div className={cn("items-center justify-center flex", className)}>
      {session.status === "authenticated" ? (
        <Button onClick={() => signOut()}>
          Sign out
        </Button>
      ) : session.status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <Button className={className} asChild>
          <Link href="/login">{children}</Link>
        </Button>
      )}
    </div>
  );
}
