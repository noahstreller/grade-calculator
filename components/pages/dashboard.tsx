"use client";
import { AverageOverview } from "@/components/cards/average-overview";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import FailingGradesCard from "@/components/cards/failingGradesCard/failingGradesCard";
import { GradeOverview } from "@/components/cards/grade-overview";
import PassingGradesCard from "@/components/cards/passingGradesCard/passingGradesCard";
import { RequiredGrades } from "@/components/cards/required-grades";
import { CardBoard } from "@/components/ui/cardboard";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import { catchProblem } from "@/lib/problem";
import { quickCreateSubject } from "@/lib/services/subject-service";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [gradeData, setGradeData] = useState<Grade[]>([]);
  const [subjectData, setSubjectData] = useState<GradeAverage[]>([]);
  const [failingData, setFailingData] = useState<GradeAverage[]>([]);
  const [passingData, setPassingData] = useState<GradeAverage[]>([]);
  const [loaded, setLoaded] = useState(false);

  function refreshGrades() {
    let grades = Grade.get();
    setGradeData([...grades]);
  }

  function refreshSubjects() {
    let averages = GradeAverage.get();
    setSubjectData([...averages]);
  }

  function refreshFailing() {
    let subjects = Subjects.getFailingSubjects();
    setFailingData([...subjects]);
  }

  function refreshPassing() {
    let subjects = Subjects.getPassingSubjects();
    setPassingData([...subjects]);
  }

  function refreshAll() {
    refreshGrades();
    refreshSubjects();
    refreshFailing();
    refreshPassing();
  }

  useEffect(() => {
    Subjects.load();
    Grade.load();
    refreshAll();
    setLoaded(true);

    const a =async () => {
      console.log(catchProblem(await quickCreateSubject("hallo")))
    }
    a()
  }, []);

  return loaded ? (
    <>
      <CardBoard className="flex xl:hidden">
        <GradeOverview
          data={gradeData}
          passingData={passingData}
          failingData={failingData}
        />
        <AverageOverview
          data={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <RequiredGrades
          gradeData={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <PassingGradesCard data={passingData} setData={setPassingData} />
        <FailingGradesCard data={failingData} setData={setFailingData} />
      </CardBoard>
      <CardBoard row className="hidden xl:flex">
        <AverageOverview
          data={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <GradeOverview
          data={gradeData}
          passingData={passingData}
          failingData={failingData}
        />
        <RequiredGrades
          gradeData={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <CardBoard>
          <PassingGradesCard data={passingData} setData={setPassingData} />
          <FailingGradesCard data={failingData} setData={setFailingData} />
        </CardBoard>
      </CardBoard>
    </>
  ) : (
    <>
      <CardBoard className="flex xl:hidden">
        <CardSkeleton wide variant="small" />
        <CardSkeleton wide variant="small" />
        <CardSkeleton wide variant="medium" />
        <CardSkeleton wide variant="large" />
      </CardBoard>
      <CardBoard row className="hidden xl:flex">
        <CardSkeleton variant="medium" />
        <CardSkeleton variant="large" />
        <CardSkeleton variant="small" />
        <CardBoard>
          <CardSkeleton variant="small" />
          <CardSkeleton variant="small" />
        </CardBoard>
      </CardBoard>
    </>
  );
}
