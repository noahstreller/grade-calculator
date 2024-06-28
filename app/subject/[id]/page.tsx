"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Subject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  getGradeAverageBySubject,
  getGradesBySubject,
} from "@/lib/services/grade-service";
import { getSubjectById } from "@/lib/services/subject-service";
import { truncateText } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubjectPage({ params }: { params: { id: string } }) {
  const session = useSession();
  const router = useRouter();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [dataState, setDataState] = useState<"loading" | "loaded" | "notfound">(
    "loading"
  );

  useEffect(() => {
    setDataState("loading");
    const fetchData = async () => {
      try {
        const id = Number(params.id);
        const subject = catchProblem(await getSubjectById(id));
        const grades = catchProblem(await getGradesBySubject(subject));
        const average = catchProblem(await getGradeAverageBySubject(subject));
        console.log("subject", subject);
        console.log("grades", grades);
        console.log("average", average);
        if (subject) {
          setSubject(subject);
          setDataState("loaded");
        } else {
          setDataState("notfound");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id, router, session]);

  if (session.status === "unauthenticated") return <>Log in first lil bro</>;
  if (session.status === "loading" || dataState === "loading")
    return <LoadingSpinner />;
  if (session.status === "authenticated")
    return dataState === "loaded" ? (
      <>
        {subject ? (
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
        ) : (
          <div>Subject not found</div>
        )}
      </>
    ) : (
      dataState === "notfound" && <div>Subject not found lil bro</div>
    );
}
