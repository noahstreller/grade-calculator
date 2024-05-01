"use client";

import { usePreferences } from "@/components/preferences-provider";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { round } from "@/lib/utils";
import { Empty } from "@/types/types";
import { useEffect, useState } from "react";

export function ColoredGrade({grade, className, roundDecimals}: {grade: number | Empty, className?: string, roundDecimals?: number}) {

  const [isPassing, setIsPassing] = useState<boolean | null>(null);
  const preferences = usePreferences();

  useEffect(() => {
    async function getPassing() {
      if (!grade || grade === null || grade === undefined) {
        setIsPassing(null);
      }
      else {
        let passing = doesGradePass(grade, preferences.preferences!);
        setIsPassing(passing);
      }
    }
    getPassing();
  }, [grade, preferences.preferences])

  return (
    <>
      {isPassing === null && (
        <p
          className={
            className
              ? `${className} text-muted-foreground`
              : "text-muted-foreground ml-4"
          }
        >
          -
        </p>
      )}
      {isPassing === false && (
        <p
          className={
            className ? `${className} text-red-400` : "text-red-400 ml-4"
          }
        >
          {round(
            grade ?? 0,
            roundDecimals ?? preferences.preferences?.gradeDecimals!
          )}
        </p>
      )}
      {isPassing === true && (
        <p
          className={
            className ? `${className} text-green-400` : "text-green-400 ml-4"
          }
        >
          {round(
            grade ?? 0,
            roundDecimals ?? preferences.preferences?.gradeDecimals!
          )}
        </p>
      )}
    </>
  );
}