"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export function SignInPageComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <Card className="h-fit w-5/6 md:w-1/2 lg:w-1/3 transition-all">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="bg-[#7289da]"
          onClick={() => {
            signIn("discord");
          }}
        >
           Sign In with Discord
        </Button>
      </CardContent>
    </Card>
  );
}