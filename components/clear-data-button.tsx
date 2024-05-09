"use client";
import { Button } from "@/components/ui/button";
import {
  clearUserGrades,
  clearUserSubjectsGrades,
} from "@/lib/services/user-service";
import { ClearDataTranslations } from "@/lib/translationObjects";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function ClearDataButton({
  translations,
  children,
}: {
  translations: ClearDataTranslations;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function clearData() {
    clearUserSubjectsGrades();
    window.location.reload();
  }
  function clearGrades() {
    clearUserGrades();
    window.location.reload();
  }
  const session = useSession();

  return session.status === "authenticated" ? (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{translations.prompt}</AlertDialogTitle>
            <AlertDialogDescription>
              {translations.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse gap-3">
            <Button onClick={() => setOpen(false)}>
              {translations.cancel}
            </Button>
            <Button onClick={clearGrades} variant="secondary">
              Clear grades only
            </Button>
            <Button variant="destructive" onClick={clearData}>
              {translations.dangerContinue}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) : null;
}
