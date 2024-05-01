"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton({children = "Sign in", className = ""}: {children?: React.ReactNode, className?: string}) {
  const session = useSession();

  return (
    <div className="items-center justify-center flex">
      {session.status === "authenticated" ? (
        <Button onClick={() => signOut()}>
          Sign out {session.data.user.uid}
        </Button>
      ) : session.status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <Button className={className} onClick={() => signIn()}>{children}</Button>
      )}
    </div>
  );
}
