"use client";

import { catchProblem } from "@/lib/problem";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { getPreferencesElseGetDefault } from "@/lib/services/preferences-service";
import { Empty } from "@/types/types";
import { useEffect, useState } from "react";

export function ColoredGrade({grade}: {grade: number | Empty}) {

  const [isPassing, setIsPassing] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPassing() {
      if (!grade || grade === null || grade === undefined) {
        setIsPassing(null);
      }
      else {
        let passing = doesGradePass(grade, catchProblem(await getPreferencesElseGetDefault()))
        setIsPassing(passing);
      }
    }
    getPassing();
  }, [grade])

  return (
    <>
      {isPassing === null && <p className="text-gray-600 ml-4">-</p>}
      {isPassing === false && <p className="text-red-400 ml-4">{grade}</p>}
      {isPassing === true && <p className="text-green-400 ml-4">{grade}</p>}
    </>
  );
}