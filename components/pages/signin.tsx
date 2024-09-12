"use client";
import { EmailLoginForm } from "@/components/email-login-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Highlight } from "@/components/ui/card-stack";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/ui/spinner";
import { SiDiscord, SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import {
  Bird,
  Clock,
  Container,
  Globe,
  MailCheck,
  ShieldEllipsis,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SignInPageComponent() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(params.get("common.error"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (session.status === "authenticated") router.push("/");
  }, [session, router]);

  return (
    <div className="flex flex-col gap-5 h-fit w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4">
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
        <>
          {error && <AuthError error={error} />}
          <Card className="transition-all">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Sign in to your account using one of the providers below.
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4 flex flex-col">
              {(process.env.NODE_ENV === "development" ||
                process.env.NEXT_PUBLIC_MOCK_OAUTH_WELLKNOWN_URL) && (
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={() => {
                    signIn("local");
                  }}
                >
                  <Container className="m-2 size-5" /> Local
                </Button>
              )}
              {process.env.NEXT_PUBLIC_CUSTOM_OAUTH_NAME && (
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={() => {
                    signIn("custom");
                  }}
                >
                  <ShieldEllipsis className="m-2 size-5" />
                  {process.env.NEXT_PUBLIC_CUSTOM_OAUTH_NAME}
                </Button>
              )}
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
              <Separator />
              <EmailLoginForm />
              <Separator />
              <CardDescription>
                Check out the legacy version, if you prefer saving your data
                locally.
              </CardDescription>
              <Button variant={"secondary"} asChild>
                <Link href="https://legacy.grades.nstr.dev">
                  <Globe className="size-4 mr-2" />
                  Legacy Version
                </Link>
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="transition-all">
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

export function SentEmailComponent() {
  return (
    <div className="flex flex-col gap-5 h-fit w-5/6 md:w-1/2 lg:w-1/3 xl:w-1/4">
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/login/sent">Sent</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="transition-all">
        <CardHeader>
          <CardTitle>E-Mail sign-in</CardTitle>
          <CardDescription>
            Make sure to check your spam folder, if you did not receive it.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <MailCheck className="size-5 flex-shrink-0" />
            <p>
              Your <Highlight>magic link</Highlight> is on the way! Check your
              Inbox.
            </p>
          </div>
          <p className="text-muted-foreground flex flex-row gap-2 items-center">
            <Clock className="size-5 flex-shrink-0" />
            It may take a moment to arrive.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthError({ error }: { error: string }) {
  return (
    <Alert className="border-red-400 border-2 shadow-lg">
      <Bird className="size-4" />
      <div className="flex flex-col gap-2">
        <AlertTitle>Something broke.</AlertTitle>
        <Separator />
        <AlertDescription className="space-y-1">
          Please try again, use a different account or contact{" "}
          <Button asChild variant={"link"} className="m-0 p-0 h-fit font-bold">
            <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
          </Button>{" "}
          if the issue persists.
          <p className="text-muted-foreground font-mono">Error Code: {error}</p>
        </AlertDescription>
      </div>
    </Alert>
  );
}
