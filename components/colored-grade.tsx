"use client";

import { usePreferences } from "@/components/preferences-provider";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { round } from "@/lib/utils";
import { Empty } from "@/types/types";
import { useEffect, useState } from "react";

export function ColoredGrade({grade}: {grade: number | Empty}) {

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
      {isPassing === null && <p className="text-muted-foreground ml-4">-</p>}
      {isPassing === false && (
        <p className="text-red-400 ml-4">
          {round(grade ?? 0, preferences.preferences?.gradeDecimals!)}
        </p>
      )}
      {isPassing === true && (
        <p className="text-green-400 ml-4">
          {round(grade ?? 0, preferences.preferences?.gradeDecimals!)}
        </p>
      )}
    </>
  );
}