"use client";
import { AverageOverview } from "@/components/cards/average-overview";
import { CardSkeleton } from "@/components/cards/card-skeleton";
import FailingGradesCard from "@/components/cards/failingGradesCard/failingGradesCard";
import { GradeOverview } from "@/components/cards/grade-overview";
import PassingGradesCard from "@/components/cards/passingGradesCard/passingGradesCard";
import { RequiredGrades } from "@/components/cards/required-grades";
import { useCategory } from "@/components/category-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBoard } from "@/components/ui/cardboard";
import { LoadingSpinner } from "@/components/ui/spinner";
import { GradeWithSubject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  getAllGradeAveragesWithSubject,
  getAllGradesWithSubject,
} from "@/lib/services/grade-service";
import { AverageWithSubject } from "@/types/types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [gradeData, setGradeData] = useState<GradeWithSubject[]>([]);
  const [averageData, setAverageData] = useState<AverageWithSubject[]>([]);
  const [failingData, setFailingData] = useState<AverageWithSubject[]>([]);
  const [passingData, setPassingData] = useState<AverageWithSubject[]>([]);
  const [loaded, setLoaded] = useState(false);
  const session = useSession();
  const categoryState = useCategory();

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

    if (session.status === "authenticated") refreshAll();
  }, [session]);

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      categoryState.categories.length > 0
    ) {
      setLoaded(true);
    }
  }, [session, categoryState.categories]);

  return session.status === "unauthenticated" ? (
    <Redirect path="/" />
  ) : loaded ? (
    <>
      <CardBoard className="flex xl:hidden">
        <DashboardHeaderCard />
        <RequiredGrades averageData={averageData} />
        <AverageOverview data={gradeData} averageData={averageData} />
        <GradeOverview
          data={gradeData}
          passingData={passingData}
          failingData={failingData}
        />
        <PassingGradesCard data={passingData} />
        <FailingGradesCard data={failingData} />
      </CardBoard>
      <CardBoard row className="hidden xl:flex">
        <CardBoard>
          <RequiredGrades averageData={averageData} />
          <PassingGradesCard data={passingData} />
          <FailingGradesCard data={failingData} />
        </CardBoard>
        <CardBoard>
          <DashboardHeaderCard />
          <GradeOverview
            data={gradeData}
            passingData={passingData}
            failingData={failingData}
          />
          <AverageOverview data={gradeData} averageData={averageData} />
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

function DashboardHeaderCard() {
  const t = useTranslations();
  const categoryState = useCategory();
  const categoryCount = categoryState.categories.length;
  const categories = categoryState.categories;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.title")}</CardTitle>
        <CardDescription>{t("dashboard.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {t.rich("dashboard.categorylist", {
          categorycount: () => <b>{categoryCount}</b>,
          count: categoryCount,
        })}
        {categoryCount < 10 && (
          <ul className="list-disc">
            {categories
              .sort((a, b) => a.name!.localeCompare(b.name!))
              .map((category) => (
                <li className="list-inside" key={category.id}>
                  {category.name}
                </li>
              ))}
          </ul>
        )}
        {categoryCount >= 5 && (
          <p className="text-sm text-gray-500 mt-1">
            {t("warnings.storage-waste")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

const Redirect = ({ path }: { path: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [path, router]);
  return <LoadingSpinner />;
};
