"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SignInPageComponent() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (session.status === "authenticated") router.push("/");
  }, [session, router]);

  return (
    <div className="flex flex-col gap-5 h-fit w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 ">
      <Breadcrumb className="pl-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/login">Login</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {session.status === "unauthenticated" ? (
        <Card className="transition-all">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign in to your account using one of the providers below.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4 flex flex-col">
            <Button
              className="w-full"
              onClick={() => {
                signIn("discord");
              }}
            >
              <SiDiscord className="m-2 size-5" /> Discord
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                signIn("github");
              }}
            >
              <SiGithub className="m-2 size-5" /> GitHub
            </Button>
            <Button
              className="w-full"
              onClick={() => {
                signIn("google");
              }}
            >
              <SiGoogle className="m-2 size-5" /> Google
            </Button>
            <CardDescription>
              Check out the legacy version, if you prefer saving your data
              locally.
            </CardDescription>
            <Button variant={"secondary"}>
              <Link href="https://legacy.grades.nstr.dev">Legacy Version</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="h-fit w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4 transition-all">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Sign in to your account using one of the providers below.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <LoadingSpinner />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
