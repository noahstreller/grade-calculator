"use client";
import { ClearDataTranslations } from "@/lib/translationObjects";
import useTranslation from "next-translate/useTranslation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Database } from "lucide-react";
import { useEffect } from "react";
import appGlobals, { AppGlobalsType } from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";

export type ExportableType = {
  preferences: AppGlobalsType,
  subjects: string[],
  grades: Grade[]
}

export function ImportExportButton({ translations }: { translations: ClearDataTranslations }) {

  const getData = (): ExportableType => {
    let preferencesString = localStorage.getItem("preferences");
    let preferences: AppGlobalsType;
    if (preferencesString) preferences = JSON.parse(preferencesString);
    else preferences = appGlobals.defaultAppGlobals;

    let subjectsString = localStorage.getItem("subjects");
    let subjects: string[];
    if (subjectsString) subjects = JSON.parse(subjectsString);
    else subjects = [];

    let gradesString = localStorage.getItem("grades");
    let grades: Grade[];
    if (gradesString) grades = JSON.parse(gradesString);
    else grades = [];

    return {
      preferences: preferences,
      subjects: subjects,
      grades: grades
    };
  }

  const setData = (data: ExportableType) => {
    localStorage.setItem("preferences", JSON.stringify(data.preferences));
    localStorage.setItem("subjects", JSON.stringify(data.subjects));
    localStorage.setItem("grades", JSON.stringify(data.grades));
  }

  const importFromText = (data: string) => {
    let results: ExportableType = JSON.parse(data);
    setData(results);
  }

  const importFromJSON = () => {
    console.log("Importing from JSON");
  }

  const exportToTextLogic = (data: ExportableType): string => {
    navigator.clipboard.writeText(JSON.stringify(data));
    return JSON.stringify(data);
  }

  const exportToText = () => {
    let data = getData();
    let result = exportToTextLogic(data);
    return result;
  }

  const exportToJSON = () => {
    console.log("Exporting to JSON");
  }

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
                <DropdownMenuItem>Text</DropdownMenuItem>
                <DropdownMenuItem>JSON</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={()=>{exportToText()}}>Text</DropdownMenuItem>
                <DropdownMenuItem>JSON</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>Clear</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

