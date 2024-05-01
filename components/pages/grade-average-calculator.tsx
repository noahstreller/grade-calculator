"use client";
import { AllGrades } from "@/components/cards/allGrades/allGrades";
import { AllSubjects } from "@/components/cards/allSubjects/allSubjects";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import FailingGradesCard from "@/components/cards/failingGradesCard/failingGradesCard";
import { CardBoard } from "@/components/ui/cardboard";
import { GradeWithSubject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getAllGradeAveragesWithSubject, getAllGradesWithSubject } from "@/lib/services/grade-service";
import { AverageWithSubject } from "@/types/types";
import { useEffect, useState } from "react";

export default function GradeAverageCalculator() {
  const [gradeData, setGradeData] = useState<GradeWithSubject[]>([]);
  const [averageData, setAverageData] = useState<AverageWithSubject[]>([]);
  const [failingData, setFailingData] = useState<AverageWithSubject[]>([]);
  // const [passingData, setPassingData] = useState<AverageWithSubject[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refreshGrades = async () => {
    let grades = catchProblem(await getAllGradesWithSubject());
    setGradeData([...grades]);
    return grades;
  };

  const refreshAverages = async () => {
    let averages = catchProblem(await getAllGradeAveragesWithSubject());
    console.table(averages);
    setAverageData([...averages]);
    return averages;
  };

  function refreshFailing(averages: AverageWithSubject[]) {
    let allAverages = averages;
    let failing = allAverages.filter(
      (average: AverageWithSubject) => average.average?.passing === false
    );
    console.table(failing);
    setFailingData([...failing]);
    return failing;
  }

  // function refreshPassing() {
  //   let subjects = Subjects.getPassingSubjects();
  //   setPassingData([...subjects]);
  // }

  function refreshAll() {
    refreshGrades();
    refreshAverages().then((averages: AverageWithSubject[]) => {
      refreshFailing(averages);
    });
    // refreshPassing();
  }

  useEffect(() => {
    //   Subjects.load();
    //   Grade.load();
    //   refreshAll();
    // setLoaded(true);

    try {
      refreshAll();
    } finally {
      setLoaded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loaded ? (
    <>
      <CardBoard className="flex xl:hidden">
        <AllSubjects
          data={averageData}
          setData={setAverageData}
          refresh={refreshAll}
        />
        <AllGrades
          data={gradeData}
          setData={setGradeData}
          refresh={refreshAll}
        />
        {/* <RequiredGrades
          gradeData={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <PassingGradesCard data={passingData} setData={setPassingData} /> */}
        <FailingGradesCard data={failingData} setData={setFailingData} />
        {/* <FailingGradesCard data={failingData} setData={setFailingData} />
        <AverageOverview
          data={gradeData}
          averageData={[...passingData, ...failingData]}
        />
        <GradeOverview
          data={gradeData}
          passingData={passingData}
          failingData={failingData}
        /> */}
      </CardBoard>
      <CardBoard row className="hidden xl:flex">
        <CardBoard>
          {/* <PassingGradesCard data={passingData} setData={setPassingData} /> */}
          <FailingGradesCard data={failingData} setData={setFailingData} />
          {/* <AverageOverview
            data={gradeData}
            averageData={[...passingData, ...failingData]}
          /> */}
        </CardBoard>
        <CardBoard>
          <AllSubjects
            data={averageData}
            setData={setAverageData}
            refresh={refreshAll}
          />
          {/* <GradeOverview
            data={gradeData}
            passingData={passingData}
            failingData={failingData}
          /> */}
        </CardBoard>
        <CardBoard>
          <AllGrades
            data={gradeData}
            setData={setGradeData}
            refresh={refreshAll}
          />
          {/* <RequiredGrades
            gradeData={gradeData}
            averageData={[...passingData, ...failingData]}
          /> */}
        </CardBoard>
      </CardBoard>
    </>
  ) : (
    <>
      <CardBoard className="flex xl:hidden">
        <CardSkeleton wide variant="medium" />
        <CardSkeleton wide variant="large" />
        <CardSkeleton wide variant="small" />
        <CardSkeleton wide variant="small" />
      </CardBoard>
      <CardBoard row className="hidden xl:flex">
        <CardBoard>
          <CardSkeleton variant="small" />
          <CardSkeleton variant="small" />
          <CardSkeleton variant="medium" />
        </CardBoard>
        <CardBoard>
          <CardSkeleton variant="medium" />
          <CardSkeleton variant="medium" />
        </CardBoard>
        <CardBoard>
          <CardSkeleton variant="large" />
          <CardSkeleton variant="medium" />
        </CardBoard>
      </CardBoard>
    </>
  );
}
