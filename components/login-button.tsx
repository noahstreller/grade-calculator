"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/spinner";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
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
        <Button onClick={() => signIn()}>Sign in</Button>
      )}
    </div>
  );
}
