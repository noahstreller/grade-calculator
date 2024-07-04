"use client";

import { GradesForSubject } from "@/components/cards/gradesForSubject/gradesForSubject";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardBoard } from "@/components/ui/cardboard";
import { LoadingSpinner } from "@/components/ui/spinner";
import { GradeWithSubject, Subject } from "@/db/schema";
import { useDevice } from "@/lib/hooks/useMediaQuery";
import { catchProblem } from "@/lib/problem";
import {
  getGradeAverageBySubject,
  getGradesBySubjectWithSubject,
} from "@/lib/services/grade-service";
import { getSubjectById } from "@/lib/services/subject-service";
import { truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubjectPage({ params }: { params: { id: string } }) {
  return <SubjectDetails subjectId={params.id} />;
}

export function SubjectDetails({ subjectId }: { subjectId: string }) {
  const session = useSession();
  const router = useRouter();
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [grades, setGrades] = useState<GradeWithSubject[]>([]);
  const [average, setAverage] = useState<AverageWithSubject>();
  const [dataState, setDataState] = useState<"loading" | "loaded" | "notfound">(
    "loading"
  );

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
        console.log("subject", subject);
        console.log("grades", newGrades);
        console.log("average", newAverage);
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
    fetchData();
  }, [subjectId, router, session]);

  if (session.status === "unauthenticated") return <>Log in first lil bro</>;
  if (session.status === "loading" || dataState === "loading")
    return <LoadingSpinner />;
  if (session.status === "authenticated")
    return dataState === "loaded" ? (
      <CardBoard row={isDesktop}>
        {subject ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{truncateText(subject.name!, 40).text}</CardTitle>
                <CardDescription>Subject details</CardDescription>
              </CardHeader>
              <CardContent>
                <b>Details</b>
                <p>ID: {subject.id}</p>
                <p>Name: {subject.name}</p>
                <p>Weight: {subject.weight}</p>
                <p>Category: {subject.category_fk}</p>
                <p>User: {subject.userId}</p>
              </CardContent>
            </Card>
            <GradesForSubject
              data={grades}
              setData={setGrades}
              refresh={console.log}
            />
          </>
        ) : (
          <div>Subject not found</div>
        )}
      </CardBoard>
    ) : (
      dataState === "notfound" && <div>Subject not found lil bro</div>
    );
}
