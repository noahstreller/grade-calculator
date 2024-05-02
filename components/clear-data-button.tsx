"use client";
import { ClearDataTranslations } from "@/lib/translationObjects";
import { useSession } from "next-auth/react";
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
} from "./ui/alert-dialog";

export function ClearDataButton({
  translations,
  children
}: {
  translations: ClearDataTranslations;
  children: React.ReactNode;
}) {
  function clearData() {
    localStorage.removeItem("grades");
    localStorage.removeItem("subjects");
    window.location.reload();
  }
  const session = useSession();

  return session.status === "authenticated" ? (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{translations.prompt}</AlertDialogTitle>
            <AlertDialogDescription>
              {translations.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{translations.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={clearData}>
              {translations.dangerContinue}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : null;
}
