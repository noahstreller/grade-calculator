"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { clearUserData } from "@/lib/services/user-service";
import {
  getInitials,
  getInitialsFromEmail,
  truncateEmail,
  truncateText,
} from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function AccountSection() {
  const session = useSession();

  const [disabled, setDisabled] = useState(true);
  const [refresher, setRefresher] = useState(0);

  const t = useTranslations();

  const clearData = () => {
    clearUserData();
    signOut();
  };

  useEffect(() => {
    setDisabled(true);
    setTimeout(() => setDisabled(false), 5000);
  }, [refresher]);

  return (
    <div className="py-5 flex flex-col gap-3">
      <div className="flex flex-row gap-2 items-center">
        <Avatar>
          <AvatarImage src={session.data?.user.image || ""} />
          <AvatarFallback>
            {session.data?.user.name
              ? getInitials(session.data?.user.name)
              : getInitialsFromEmail(session.data?.user.email || "")}
          </AvatarFallback>
        </Avatar>
        <div>
          {session.data?.user.name && (
            <h2 className="text-lg font-semibold">
              {truncateText(session.data?.user.name, 20).text}
            </h2>
          )}
          <p className="text-gray-500">
            {truncateEmail(session.data?.user.email || "", 15)}
          </p>
        </div>
      </div>
      <Button variant={"secondary"} onClick={() => signOut()}>
        {t("auth.logout")}
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"destructive"}
            onClick={() => setRefresher(Math.random())}
          >
            {t("actions.delete-account")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("actions.clear-account-data")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("actions.clear-account-data-warning")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("generic.nevermind")}</AlertDialogCancel>
            <AlertDialogAction disabled={disabled} onClick={clearData}>
              {t("generic.doit")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
