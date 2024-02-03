"use client";
import { Trash2 } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog";
import { Button } from "./button";

export function ClearDataButton() {
    const { t, lang } = useTranslation('common');

    function clearData() {
        localStorage.removeItem('grades');
        localStorage.removeItem('subjects');
        window.location.reload();
    }

    return (
      <div className="mr-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="outline" className="hover:text-red-400">
              <Trash2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-inherit" />
              <span className="sr-only">Delete all data</span>
              </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("actions.clear-data.prompt")}</AlertDialogTitle>
              <AlertDialogDescription>
              {t("actions.clear-data.message")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("actions.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={clearData}>{t("actions.danger-continue")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
}