"use client";
import { restoreBackup } from "@/lib/storageUtils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function CorruptedDataDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function close() {
    setIsOpen(false);
    router.push(pathname, { scroll: false });
  }

  function restore() {
    restoreBackup();
    window.location.href = pathname;
  }

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (new URLSearchParams(params).has("corrupted")) {
      setIsOpen(true);
    }
  }, [searchParams]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Corrupted Data</AlertDialogTitle>
          <AlertDialogDescription>
            Your save seems to be corrupted. We have reset it for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              close();
            }}
          >
            Got it.
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              restore();
            }}
          >
            Restore backup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
