"use client";
import { AllGrades } from "@/components/cards/allGrades/allGrades";
import { AllSubjects } from "@/components/cards/allSubjects/allSubjects";
import { AverageOverview } from "@/components/cards/average-overview";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import { GradeOverview } from "@/components/cards/grade-overview";
import { RequiredGrades } from "@/components/cards/required-grades";
import { LandingPage } from "@/components/pages/landing-page";
import { CardBoard } from "@/components/ui/cardboard";
import { GradeWithSubject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  getAllGradeAveragesWithSubject,
  getAllGradesWithSubject,
} from "@/lib/services/grade-service";
import { AverageWithSubject } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GradeAverageCalculator() {
  const [gradeData, setGradeData] = useState<GradeWithSubject[]>([]);
  const [averageData, setAverageData] = useState<AverageWithSubject[]>([]);
  const [failingData, setFailingData] = useState<AverageWithSubject[]>([]);
  const [passingData, setPassingData] = useState<AverageWithSubject[]>([]);
  const [loaded, setLoaded] = useState(false);
  const session = useSession();

  const refreshGrades = async () => {
    let grades = catchProblem(await getAllGradesWithSubject());
    setGradeData([...grades]);
    return grades;
  };

  const refreshAverages = async () => {
    let averages = catchProblem(await getAllGradeAveragesWithSubject());
    setAverageData([...averages]);
    return averages;
  };

  function refreshFailing(averages: AverageWithSubject[]) {
    let allAverages = averages;
    let failing = allAverages.filter(
      (average: AverageWithSubject) => average.average?.passing === false
    );
    setFailingData([...failing]);
    return failing;
  }

  function refreshPassing(averages: AverageWithSubject[]) {
    let allAverages = averages;
    let passing = allAverages.filter(
      (average: AverageWithSubject) => average.average?.passing
    );
    setPassingData([...passing]);
    return passing;
  }

  function refreshAll() {
    refreshGrades();
    refreshAverages().then((averages: AverageWithSubject[]) => {
      refreshFailing(averages);
      refreshPassing(averages);
    });
  }

  useEffect(() => {
    const refreshGrades = async () => {
      let grades = catchProblem(await getAllGradesWithSubject());
      setGradeData([...grades]);
      return grades;
    };

    const refreshAverages = async () => {
      let averages = catchProblem(await getAllGradeAveragesWithSubject());
      setAverageData([...averages]);
      return averages;
    };

    function refreshFailing(averages: AverageWithSubject[]) {
      let allAverages = averages;
      let failing = allAverages.filter(
        (average: AverageWithSubject) => average.average?.passing === false
      );
      setFailingData([...failing]);
      return failing;
    }

    function refreshPassing(averages: AverageWithSubject[]) {
      let allAverages = averages;
      let passing = allAverages.filter(
        (average: AverageWithSubject) => average.average?.passing
      );
      setPassingData([...passing]);
      return passing;
    }

    function refreshAll() {
      refreshGrades();
      refreshAverages().then((averages: AverageWithSubject[]) => {
        refreshFailing(averages);
        refreshPassing(averages);
      });
    }

    if (session.status === "authenticated") {
      try {
        refreshAll();
      } finally {
        setLoaded(true);
      }
    }
  }, [session]);

  return session.status === "unauthenticated" ? (
    <div>
      <LandingPage />
    </div>
  ) : loaded ? (
    gradeData.length > 0 ? (
      <>
        <CardBoard className="flex xl:hidden">
          <AllSubjects
            data={averageData}
            failingData={failingData}
            passingData={passingData}
            setData={setAverageData}
            refresh={refreshAll}
          />
          <AllGrades
            data={gradeData}
            setData={setGradeData}
            refresh={refreshAll}
          />
          <RequiredGrades averageData={averageData} />
          <AverageOverview data={gradeData} averageData={averageData} />
          <GradeOverview
            data={gradeData}
            passingData={passingData}
            failingData={failingData}
          />
        </CardBoard>
        <CardBoard row className="hidden xl:flex">
          <CardBoard>
            <GradeOverview
              data={gradeData}
              passingData={passingData}
              failingData={failingData}
            />
            <AverageOverview data={gradeData} averageData={averageData} />
          </CardBoard>
          <CardBoard>
            <AllGrades
              data={gradeData}
              setData={setGradeData}
              refresh={refreshAll}
            />
            <RequiredGrades averageData={averageData} />
          </CardBoard>
          <CardBoard>
            <AllSubjects
              data={averageData}
              failingData={failingData}
              passingData={passingData}
              setData={setAverageData}
              refresh={refreshAll}
            />
          </CardBoard>
        </CardBoard>
      </>
    ) : (
      <>
        <CardBoard className="flex xl:hidden">
          {averageData.length > 0 && (
            <AllGrades
              data={gradeData}
              setData={setGradeData}
              refresh={refreshAll}
            />
          )}
          <AllSubjects
            data={averageData}
            failingData={failingData}
            passingData={passingData}
            setData={setAverageData}
            refresh={refreshAll}
          />
        </CardBoard>
        {averageData.length > 0 ? (
          <CardBoard row className="hidden xl:flex w-1/2">
            <AllGrades
              data={gradeData}
              setData={setGradeData}
              refresh={refreshAll}
            />

            <AllSubjects
              data={averageData}
              failingData={failingData}
              passingData={passingData}
              setData={setAverageData}
              refresh={refreshAll}
            />
          </CardBoard>
        ) : (
          <CardBoard row className="hidden xl:flex">
            <AllSubjects
              data={averageData}
              failingData={failingData}
              passingData={passingData}
              setData={setAverageData}
              refresh={refreshAll}
            />
          </CardBoard>
        )}
      </>
    )
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
