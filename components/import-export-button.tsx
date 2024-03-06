"use client";
import { AppGlobalsType } from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { exportToText, importFromText } from "@/lib/storageUtils";
import { ClearDataTranslations } from "@/lib/translationObjects";
import { Database } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";

export type ExportableType = {
  preferences: AppGlobalsType,
  subjects: string[],
  grades: Grade[]
}

export function ImportExportButton({ translations }: { translations: ClearDataTranslations }) {

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
                <DropdownMenuItem onClick={()=>importFromText()}>Text (Clipboard)</DropdownMenuItem>
                <DropdownMenuItem>JSON File</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={()=>{exportToText()}}>Text (Clipboard)</DropdownMenuItem>
                <DropdownMenuItem>JSON File</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Clear</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

