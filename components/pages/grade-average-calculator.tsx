"use client";
import { AllGrades } from "@/components/cards/allGrades/allGrades";
import { AllSubjects } from "@/components/cards/allSubjects/allSubjects";
import { AverageOverview } from "@/components/cards/average-overview";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import { GradeOverview } from "@/components/cards/grade-overview";
import { RequiredGrades } from "@/components/cards/required-grades";
import { useCategory } from "@/components/category-provider";
import { LandingPage } from "@/components/pages/landing-page";
import { CardBoard } from "@/components/ui/cardboard";
import { GradeWithSubject } from "@/db/schema";
import { MediaQueries, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { catchProblem } from "@/lib/problem";
import {
  getAllGradeAveragesWithSubject,
  getAllGradesWithSubject,
} from "@/lib/services/grade-service";
import { AverageWithSubject } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GradeAverageCalculator() {
  const categoryState = useCategory();
  const [gradeData, setGradeData] = useState<GradeWithSubject[]>([]);
  const [averageData, setAverageData] = useState<AverageWithSubject[]>([]);
  const [failingData, setFailingData] = useState<AverageWithSubject[]>([]);
  const [passingData, setPassingData] = useState<AverageWithSubject[]>([]);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const session = useSession();
  const isDesktop = useMediaQuery(MediaQueries.xxl);
  const isTablet = useMediaQuery(MediaQueries.xl) && !isDesktop;
  const isMobile = useMediaQuery(MediaQueries.sm) && !isTablet && !isDesktop;

  const refreshGrades = async () => {
    let grades = catchProblem(
      await getAllGradesWithSubject(categoryState.category?.id),
    );
    setGradeData([...grades]);
    return grades;
  };

  const refreshAverages = async () => {
    let averages = catchProblem(
      await getAllGradeAveragesWithSubject(categoryState.category?.id),
    );
    setAverageData([...averages]);
    return averages;
  };

  function refreshFailing(averages: AverageWithSubject[]) {
    let allAverages = averages;
    let failing = allAverages.filter(
      (average: AverageWithSubject) => average.average?.passing === false,
    );
    setFailingData([...failing]);
    return failing;
  }

  function refreshPassing(averages: AverageWithSubject[]) {
    let allAverages = averages;
    let passing = allAverages.filter(
      (average: AverageWithSubject) => average.average?.passing,
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
      let grades = catchProblem(
        await getAllGradesWithSubject(categoryState.category?.id),
      );
      setGradeData([...grades]);
      return grades;
    };

    const refreshAverages = async () => {
      let averages = catchProblem(
        await getAllGradeAveragesWithSubject(categoryState.category?.id),
      );
      setAverageData([...averages]);
      return averages;
    };

    function refreshFailing(averages: AverageWithSubject[]) {
      let allAverages = averages;
      let failing = allAverages.filter(
        (average: AverageWithSubject) => average.average?.passing === false,
      );
      setFailingData([...failing]);
      return failing;
    }

    function refreshPassing(averages: AverageWithSubject[]) {
      let allAverages = averages;
      let passing = allAverages.filter(
        (average: AverageWithSubject) => average.average?.passing,
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
        if (categoryState.category) refreshAll();
      } finally {
        if (categoryState.category) setAuthLoaded(true);
      }
    }
  }, [session, categoryState.category]);

  useEffect(() => {
    if (!categoryState.loading && authLoaded) {
      setAllLoaded(true);
    } else setAllLoaded(false);
  }, [categoryState.loading, authLoaded]);

  if (session.status === "unauthenticated")
    return (
      <div>
        <LandingPage />
      </div>
    );

  if (allLoaded)
    return gradeData.length > 0 ? (
      <>
        {isMobile && (
          <CardBoard>
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
        )}
        {isTablet && (
          <CardBoard row className="max-w-[95vw]">
            <CardBoard>
              <AllGrades
                data={gradeData}
                setData={setGradeData}
                refresh={refreshAll}
              />
              <GradeOverview
                data={gradeData}
                passingData={passingData}
                failingData={failingData}
              />
            </CardBoard>
            <CardBoard>
              <AllSubjects
                data={averageData}
                failingData={failingData}
                passingData={passingData}
                setData={setAverageData}
                refresh={refreshAll}
              />
              <AverageOverview data={gradeData} averageData={averageData} />
              <RequiredGrades averageData={averageData} />
            </CardBoard>
          </CardBoard>
        )}
        {isDesktop && (
          <CardBoard row className="max-w-[95vw]">
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
        )}
      </>
    ) : (
      <CardBoard>
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
    );

  return (
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
