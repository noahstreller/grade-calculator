"use client";
import { AppGlobalsType } from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import {
  exportToJSONFile,
  exportToText,
  importFromJSON,
  importFromText,
} from "@/lib/storageUtils";
import { ClearDataTranslations } from "@/lib/translationObjects";
import { Database } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export type ExportableType = {
  preferences: AppGlobalsType;
  subjects: string[];
  grades: Grade[];
};

export function ImportExportButton() {
  const { t } = useTranslation("common");

  const clearDataTranslations: ClearDataTranslations = {
    prompt: t("actions.clear-data.prompt"),
    message: t("actions.clear-data.message"),
    cancel: t("actions.cancel"),
    dangerContinue: t("actions.danger-continue"),
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Database className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-inherit" />
            <span className="sr-only">Manage data</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage data</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Import data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={importFromText}>
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={importFromJSON}>
                  JSON (File)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={exportToText}>
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToJSONFile}>
                  JSON (File)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
