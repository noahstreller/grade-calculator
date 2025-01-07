"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import { Bird, HomeIcon, LayoutDashboardIcon, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function NotFoundPage() {
  const t = useTranslations();
  const session = useSession();

  return (
    <div className="flex flex-col gap-5 h-fit w-5/6 md:w-1/2 xl:w-1/3">
      <Breadcrumb className="pl-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t("generic.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <b>404.</b>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="transition-all">
        <CardHeader>
          <CardTitle>
            {t.rich("errors.not-found.title", {
              mutebold: (text) => (
                <span className="font-extrabold text-muted-foreground">
                  {text}
                </span>
              ),
            })}
          </CardTitle>
          <CardDescription>{t("errors.not-found.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-6">
          <div className="flex flex-row gap-4 justify-center items-center">
            <Bird className="size-5 flex-shrink-0 text-muted-foreground" />
            <p>
              {t.rich("errors.not-found.message", {
                red: (text) => <Highlight colorName="red">{text}</Highlight>,
              })}
            </p>
          </div>
          <div className="flex flex-row justify-center gap-4">
            <Link href="/">
              <Button className="flex flex-row gap-2 items-center">
                <HomeIcon className="size-4" />
                {t("errors.not-found.back")}
              </Button>
            </Link>
            {session.status === "authenticated" && (
              <Link href="/dashboard">
                <Button
                  variant={"secondary"}
                  className="flex flex-row gap-2 items-center"
                >
                  <LayoutDashboardIcon className="size-4" />
                  {t("errors.not-found.dashboard")}
                </Button>
              </Link>
            )}
            {session.status === "unauthenticated" && (
              <Link href="/login">
                <Button
                  variant={"secondary"}
                  className="flex flex-row gap-2 items-center"
                >
                  <LogIn className="size-4" />
                  {t("errors.not-found.login")}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
