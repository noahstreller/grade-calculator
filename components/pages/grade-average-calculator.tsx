"use client";
import { AllGrades } from "@/components/cards/allGrades/allGrades";
import { AllSubjects } from "@/components/cards/allSubjects/allSubjects";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import { CardBoard } from "@/components/ui/cardboard";
import { Grade } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getAllGradeAverages, getAllGrades } from "@/lib/services/grade-service";
import { Average } from "@/types/types";
import { useEffect, useState } from "react";

export default function GradeAverageCalculator() {
  const [gradeData, setGradeData] = useState<Grade[]>([]);
  const [averageData, setAverageData] = useState<Average[]>([]);
  // const [failingData, setFailingData] = useState<GradeAverage[]>([]);
  // const [passingData, setPassingData] = useState<GradeAverage[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refreshGrades = async () => {
    let grades = catchProblem(await getAllGrades());
    setGradeData([...grades]);
  }

  const refreshAverages = async () => {
    let averages = catchProblem(await getAllGradeAverages())
    setAverageData([...averages]);
  }

  // function refreshFailing() {
  //   let subjects = Subjects.getFailingSubjects();
  //   setFailingData([...subjects]);
  // }

  // function refreshPassing() {
  //   let subjects = Subjects.getPassingSubjects();
  //   setPassingData([...subjects]);
  // }

  function refreshAll() {
    refreshGrades();
    refreshAverages();
    // refreshFailing();
    // refreshPassing();
  }

  useEffect(() => {
  //   Subjects.load();
  //   Grade.load();
  //   refreshAll();
  // setLoaded(true);

    try {
      refreshAll()
    }
    finally {
      setLoaded(true)
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
        <PassingGradesCard data={passingData} setData={setPassingData} />
        <FailingGradesCard data={failingData} setData={setFailingData} />
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
        {/* <CardBoard>
          <PassingGradesCard data={passingData} setData={setPassingData} />
          <FailingGradesCard data={failingData} setData={setFailingData} />
          <AverageOverview
            data={gradeData}
            averageData={[...passingData, ...failingData]}
          />
        </CardBoard> */}
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
