"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export function SignInPageComponent() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);


  return (
    <Card className="h-fit w-5/6 md:w-1/2 lg:w-1/3 transition-all">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Sign in to your account using one of the providers below.
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <Button
          className="bg-[#7289da] hover:bg-[#4d5a8c] text-foreground w-full"
          onClick={() => {
            signIn("discord");
          }}
        >
          <SiDiscord className="m-2" /> Discord
        </Button>
        <CardDescription>
          Want to use the web app without an account? Check out the legacy version, which saves the data locally in your browser.
        </CardDescription>
        <Button variant={"secondary"}>
          <Link href="https://legacy.grades.nstr.dev">Legacy Version</Link>
        </Button>
      </CardContent>
    </Card>
  );
}