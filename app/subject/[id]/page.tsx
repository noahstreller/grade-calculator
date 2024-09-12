"use client";

import { CardSkeleton } from "@/components/cards/card-skeleton";
import { GradeOverviewForSubject } from "@/components/cards/grade-overview";
import { GradesForSubject } from "@/components/cards/gradesForSubject/gradesForSubject";
import { RequiredGradesForSubject } from "@/components/cards/required-grades";
import { usePreferences } from "@/components/preferences-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBoard } from "@/components/ui/cardboard";
import { DetailRow, DetailRowBoolean } from "@/components/ui/detail-row";
import { GradeWithSubject, Subject } from "@/db/schema";
import { useDevice } from "@/lib/hooks/useMediaQuery";
import { catchProblem } from "@/lib/problem";
import {
  getGradeAverageBySubject,
  getGradesBySubjectWithSubject,
} from "@/lib/services/grade-service";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { getSubjectById } from "@/lib/services/subject-service";
import { truncateText } from "@/lib/utils";
import { Average } from "@/types/types";
import { Bird, HomeIcon, LogInIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubjectPage({ params }: { params: { id: string } }) {
  return <SubjectDetails subjectId={params.id} />;
}

function SubjectDetails({ subjectId }: { subjectId: string }) {
  const session = useSession();
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [grades, setGrades] = useState<GradeWithSubject[]>([]);
  const [average, setAverage] = useState<Average | null>(null);
  const [dataState, setDataState] = useState<
    "loading" | "loaded" | "notfound" | "empty"
  >("loading");
  const userPreferences = usePreferences();
  const { t } = useTranslation("common");

  const fetchData = async () => {
    try {
      const id = Number(subjectId);
      const subject = catchProblem(await getSubjectById(id));
      const newGrades = catchProblem(
        await getGradesBySubjectWithSubject(subject)
      );
      const newAverage = catchProblem(await getGradeAverageBySubject(subject));
      if (subject) {
        setSubject(subject);
        setGrades([...newGrades]);
        setAverage(newAverage);
        setDataState("loaded");
      } else {
        setDataState("notfound");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataState("loading");
    const fetchData = async () => {
      try {
        const id = Number(subjectId);
        const subject = catchProblem(await getSubjectById(id));
        const newGrades = catchProblem(
          await getGradesBySubjectWithSubject(subject)
        );
        const newAverage = catchProblem(
          await getGradeAverageBySubject(subject)
        );
        if (subject && newGrades && newAverage) {
          setSubject(subject);
          setGrades([...newGrades]);
          setAverage(newAverage);
          setDataState("loaded");
        } else {
          subject && newGrades.length === 0
            ? setDataState("empty")
            : setDataState("notfound");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [subjectId, router, session]);

  if (session.status === "unauthenticated")
    return (
      <div>
        <Breadcrumb className="pl-2 pb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("home")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t("subjects")}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {subject ? truncateText(subject.name!, 20).text : subjectId}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle className="font-bold">Woops.</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <>{t("you_must_be_logged_in_to_view_subject_details")}</>
            <Button asChild>
              <Link
                href={"/login"}
                className="flex flex-row gap-2 justify-center items-center"
              >
                <LogInIcon className="size-4 text-muted-foreground" />
                {t("log_in_now")}{" "}
              </Link>
            </Button>
            <Button variant={"outline"} asChild>
              <Link
                href={"/"}
                className="flex flex-row gap-2 justify-center items-center"
              >
                <HomeIcon className="size-4 text-muted-foreground" />
                {t("go_home")}{" "}
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (dataState === "empty")
    return (
      <div>
        <Breadcrumb className="pl-2 pb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("home-0")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t("subjects-0")}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {subject ? truncateText(subject.name!, 20).text : subjectId}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle className="font-bold">Woops.</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <>{t("this_subject_contains_no_data_yet")}</>
            <Button variant={"outline"} asChild>
              <Link
                href={"/"}
                className="flex flex-row gap-2 justify-center items-center"
              >
                <HomeIcon className="size-4 text-muted-foreground" />
                {t("return_home")}{" "}
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (dataState === "notfound")
    return (
      <div>
        <Breadcrumb className="pl-2 pb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t("home-1")}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t("subjects-1")}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {subject ? truncateText(subject.name!, 20).text : subjectId}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Alert>
          <Bird className="h-4 w-4" />
          <AlertTitle className="font-bold">Woops.</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <>{t("we_cannot_find_the_subject_you_are_looking_for")}</>
            <Button variant={"outline"} asChild>
              <Link
                href={"/"}
                className="flex flex-row gap-2 justify-center items-center"
              >
                <HomeIcon className="size-4 text-muted-foreground" />
                {t("return_home-0")}{" "}
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (
    session.status === "loading" ||
    dataState === "loading" ||
    subject === null ||
    subject === undefined ||
    grades === null ||
    grades === undefined ||
    average === null ||
    average === undefined ||
    (!isMobile && !isTablet && !isDesktop)
  )
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
  if (session.status === "authenticated")
    return (
      dataState === "loaded" && (
        <>
          <Breadcrumb className="pl-2 pb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{t("home-2")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{t("subjects-2")}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {subject ? truncateText(subject.name!, 20).text : subjectId}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CardBoard row={isDesktop}>
            {subject ? (
              <>
                <CardBoard>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {truncateText(subject.name!, 20).text}
                      </CardTitle>
                      <CardDescription>{t("subject_details")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DetailRow title="ID" value={subject.id} />
                      <DetailRow
                        title={t("name")}
                        value={truncateText(subject.name!, 40).text}
                      />
                      <DetailRowBoolean
                        variant="yes-no"
                        title={t("passing")}
                        value={doesGradePass(
                          average.gradeAverage!,
                          userPreferences.preferences!
                        )}
                      />
                      <DetailRowBoolean
                        variant="yes-no"
                        title={t("relevant_for_academic_promotion")}
                        value={subject.weight === 1}
                      />
                      {average.gradeAmount === average.gradeWeightedAmount ? (
                        <DetailRow
                          title={t("grade_count")}
                          value={average.gradeAmount}
                        />
                      ) : (
                        <>
                          <DetailRow
                            title={t("grade_count-0")}
                            value={average.gradeAmount}
                          />
                          <DetailRow
                            title={t("grade_count_weights_considered")}
                            value={average.gradeWeightedAmount}
                          />
                        </>
                      )}

                      {average.gradeSum === average.gradeWeightedSum ? (
                        <DetailRow
                          title={t("grade_sum")}
                          value={average.gradeSum}
                        />
                      ) : (
                        <>
                          <DetailRow
                            title={t("grade_sum-0")}
                            value={average.gradeSum}
                          />
                          <DetailRow
                            title={t("grade_sum_weights_considered")}
                            value={average.gradeWeightedSum}
                          />
                        </>
                      )}
                    </CardContent>
                  </Card>
                  <GradesForSubject
                    data={grades}
                    setData={setGrades}
                    refresh={fetchData}
                    subject={subject}
                  />
                </CardBoard>
                {average && (
                  <>
                    <GradeOverviewForSubject
                      data={grades}
                      averageData={average}
                    />
                    <RequiredGradesForSubject
                      subject={subject}
                      averageData={average}
                    />
                  </>
                )}
              </>
            ) : (
              <div>{t("subject_not_found")}</div>
            )}
          </CardBoard>
        </>
      )
    );
}
