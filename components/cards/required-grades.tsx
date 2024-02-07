"use client";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CardBoard } from "../ui/cardboard";

function RequiredGradesBody({
  gradeData,
  averageData,
}: {
  gradeData: Grade[];
  averageData: GradeAverage[];
}) {
  const chunkIntoPieces = (data: Array<any>, amount: number = 2) => {
    const result = [];
    for (let i = 0; i < data.length; i += amount) {
      result.push(data.slice(i, i + amount));
    }
    return result;
  };

  const [chunkPairs, setChunkPairs] = useState<Array<any>>([]);

  useEffect(() => {
    setChunkPairs([...chunkIntoPieces(averageData)]);
  }, [averageData]);

  return (
    <CardBoard>
      {chunkPairs.map((pair, index) => (
        <CardBoard row key={index}>
          {pair.map((average: GradeAverage, index: number) => (
            <Card key={index}>
              <CardHeader>
                <h2>{average.subject} <Badge variant="secondary">{average.grades.length}</Badge></h2>
              </CardHeader>
              <CardContent>
                <h1 className="text-2xl"><b className="text-5xl">{average.gradeAverage}</b><br />or more</h1>
              </CardContent>
            </Card>
          ))}
        </CardBoard>
      ))}
    </CardBoard>
  );
}

export function RequiredGrades({
  gradeData,
  averageData,
}: {
  gradeData: Grade[];
  averageData: GradeAverage[];
}) {
  return (
    <Card>
      <CardHeader>
        <h2>Required Grades</h2>
      </CardHeader>
      <CardContent>
        <RequiredGradesBody gradeData={gradeData} averageData={averageData} />
      </CardContent>
    </Card>
  );
}
