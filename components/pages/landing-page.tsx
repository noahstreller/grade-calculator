"use client";
import { AverageOverview } from "@/components/cards/average-overview";
import { GradeOverview } from "@/components/cards/grade-overview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardStack, Highlight } from "@/components/ui/card-stack";
import { CardBoard } from "@/components/ui/cardboard";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { GradeWithSubject } from "@/db/schema";
import { AverageWithSubject } from "@/types/types";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { Globe, Info, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hovering, setHovering] = useState(false);

  const TABS = [
    {
      title: (
        <div className="flex flex-row items-center gap-2">
          <Sparkles className="size-4" />
          Getting started
        </div>
      ),
      value: "start",
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Grade Calculator</CardTitle>
            <CardDescription>
              Some boring additional information about this project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardBoard row>
              <AverageOverview
                data={MOCKDATA.data}
                averageData={MOCKDATA.averageData}
              />
              <Card>
                <CardHeader>
                  <CardTitle>Get started now</CardTitle>
                </CardHeader>
              </Card>
              <motion.div
                style={{
                  opacity: hovering ? 1 : 0.1,
                }}
                onMouseEnter={() => {
                  setHovering(true);
                }}
                onMouseLeave={() => {
                  setHovering(false);
                }}
              >
                <GradeOverview
                  data={MOCKDATA.data}
                  failingData={MOCKDATA.failingData(MOCKDATA.averageData)}
                  passingData={MOCKDATA.passingData(MOCKDATA.averageData)}
                />
              </motion.div>
            </CardBoard>
          </CardContent>
        </Card>
      ),
    },
    {
      title: (
        <div className="flex flex-row items-center gap-2">
          <Info className="size-4" />
          Learn more
        </div>
      ),
      value: "about",
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>About this project</CardTitle>
            <CardDescription>
              Some boring additional information about this project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:flex flex-col">
              <CardBoard>
                <CardBoard row>
                  <CardBoard>
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Description</CardTitle>
                      </CardHeader>
                      <CardContent className="gap-5 flex flex-col">
                        <p>
                          This project is a grade calculator / dashboard. It
                          allows for some customization; for example, you are
                          able to define the grading scale yourself. As of right
                          now, it{" "}
                          <Highlight colorName="green">
                            supports only numeric scales
                          </Highlight>{" "}
                          and{" "}
                          <Highlight colorName="red">
                            does not support letter grades
                          </Highlight>
                          .
                        </p>
                        <p>
                          This project uses some components from{" "}
                          <Highlight colorName="blue">
                            <a target="_blank" href="https://ui.shadcn.com">
                              shadcn/ui
                            </a>
                          </Highlight>{" "}
                          and{" "}
                          <Highlight colorName="blue">
                            <a
                              target="_blank"
                              href="https://ui.aceternity.com/components"
                            >
                              Aceternity UI
                            </a>
                          </Highlight>
                          .
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle>Getting started</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-5">
                        <p>
                          This grade calculator features a{" "}
                          <Highlight colorName="yellow">cloud synced</Highlight>
                          , and a{" "}
                          <Highlight colorName="yellow">legacy</Highlight>{" "}
                          version, which stores all data locally in your
                          browser.
                        </p>
                        <p>
                          To use the cloud synced version, you need to
                          authenticate first. To access the legacy version,{" "}
                          <Highlight colorName="blue">
                            <a
                              target="_blank"
                              href="https://legacy.grades.nstr.dev"
                            >
                              click here
                            </a>
                          </Highlight>
                          <div className="flex justify-center gap-5 m-5 xl:flex-row flex-col">
                            <Button className="w-full shadow-md" asChild>
                              <Link href={"/login"}>
                                <Sparkles className="size-4 mr-2" />
                                Continue to the app
                              </Link>
                            </Button>
                            <Button
                              className="w-full shadow-md"
                              variant={"secondary"}
                              asChild
                            >
                              <Link href={"https://legacy.grades.nstr.dev"}>
                                <Globe className="size-4 mr-2" />
                                Use the legacy version
                              </Link>
                            </Button>
                          </div>
                        </p>
                      </CardContent>
                    </Card>
                  </CardBoard>
                  <CardBoard>
                    <CardStack items={CARDS} offset={7} />
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>Source Code</CardTitle>
                      </CardHeader>
                      <CardContent className="gap-5 flex flex-col">
                        <p>
                          You can find the source code for this project on
                          GitHub.
                        </p>
                        <Button
                          variant={"secondary"}
                          className="shadow-lg"
                          asChild
                        >
                          <Link
                            href={
                              "https://github.com/noahstreller/notenrechner-next"
                            }
                          >
                            <SiGithub className="size-4 m-2" />
                            View on GitHub
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </CardBoard>
                </CardBoard>
              </CardBoard>
            </div>
            <div className="flex flex-col gap-10 w-full self-center m-auto">
              <div className="flex lg:hidden flex-col">
                <CardBoard>
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle>Getting started</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                      <p>
                        This grade calculator features a{" "}
                        <Highlight colorName="yellow">cloud synced</Highlight>,
                        and a <Highlight colorName="yellow">legacy</Highlight>{" "}
                        version, which stores all data locally in your browser.
                      </p>
                      <p>
                        To use the cloud synced version, you need to
                        authenticate first. To access the legacy version,{" "}
                        <Highlight colorName="blue">
                          <a
                            target="_blank"
                            href="https://legacy.grades.nstr.dev"
                          >
                            click here
                          </a>
                        </Highlight>
                        <div className="flex justify-center gap-5 m-5 xl:flex-row flex-col">
                          <Button className="w-full shadow-md" asChild>
                            <Link href={"/login"}>
                              <Sparkles className="size-4 mr-2" />
                              Continue to the app
                            </Link>
                          </Button>
                          <Button
                            className="w-full shadow-md"
                            variant={"secondary"}
                            asChild
                          >
                            <Link href={"https://legacy.grades.nstr.dev"}>
                              <Globe className="size-4 mr-2" />
                              Use the legacy version
                            </Link>
                          </Button>
                        </div>
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>About this project</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-5 flex flex-col">
                      <p>
                        This project is a grade calculator / dashboard. It
                        allows for some customization; for example, you are able
                        to define the grading scale yourself. As of right now,
                        it{" "}
                        <Highlight colorName="green">
                          supports only numeric scales
                        </Highlight>{" "}
                        and{" "}
                        <Highlight colorName="red">
                          does not support letter grades
                        </Highlight>
                        .
                      </p>
                      <p>
                        This project uses some components from{" "}
                        <Highlight colorName="blue">
                          <a target="_blank" href="https://ui.shadcn.com">
                            shadcn/ui
                          </a>
                        </Highlight>{" "}
                        and{" "}
                        <Highlight colorName="blue">
                          <a
                            target="_blank"
                            href="https://ui.aceternity.com/components"
                          >
                            Aceternity UI
                          </a>
                        </Highlight>
                        .
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-md mb-5">
                    <CardHeader>
                      <CardTitle>Source Code</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-5 flex flex-col">
                      <p>
                        You can find the source code for this project on GitHub.
                      </p>
                      <Button
                        variant={"secondary"}
                        className="shadow-lg"
                        asChild
                      >
                        <Link
                          href={
                            "https://github.com/noahstreller/notenrechner-next"
                          }
                        >
                          <SiGithub className="size-4 m-2" />
                          View on GitHub
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <CardStack items={CARDS} offset={7} />
                </CardBoard>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];
  return (
    <div className="w-screen h-screen">
      <div className="[perspective:1000px] h-full relative b flex flex-col mx-auto w-11/12">
        <Tabs tabs={TABS} />
      </div>
    </div>
  );
}

const CARDS = [
  {
    id: 0,
    name: "Noah",
    designation: "Project Creator",
    content: (
      <div className="flex flex-col gap-3">
        <CardTitle>Real review</CardTitle>
        <Separator />
        <p>
          It sure is{" "}
          <Highlight colorName="yellow">one of the grade calculators</Highlight>{" "}
          of all times.
        </p>
      </div>
    ),
  },
  {
    id: 1,
    name: "Noah",
    designation: "User",
    content: (
      <div className="flex flex-col gap-3">
        <CardTitle>Real review</CardTitle>
        <Separator />
        <p>There is no way to review this bruh</p>
      </div>
    ),
  },
  {
    id: 2,
    name: "Noah",
    designation: "Tester",
    content: (
      <div className="flex flex-col gap-3">
        <CardTitle>Real review</CardTitle>
        <Separator />
        <p>Sorry, nobody has reviewed yet, so this will have to do.</p>
      </div>
    ),
  },
  {
    id: 3,
    name: "Noah",
    designation: "Lead Developer",
    content: (
      <div className="flex flex-col gap-3">
        <CardTitle>Real review</CardTitle>
        <Separator />
        <p>
          Believe it or not, this calculator also doubles as a{" "}
          <Highlight colorName="yellow">weather forecaster</Highlight>.
          Predicted rain on my exam day, and it poured.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    name: "Noah",
    designation: "Project Manager",
    content: (
      <div className="flex flex-col gap-3">
        <CardTitle>Real review</CardTitle>
        <Separator />
        <p>
          After using this grade calculator, I achieved{" "}
          <Highlight colorName="yellow">instant enlightenment</Highlight>. Now
          pondering the mysteries of the universe instead of my homework.
        </p>
      </div>
    ),
  },
];

const MOCKDATA: {
  data: GradeWithSubject[];
  averageData: AverageWithSubject[];
  failingData: (data: AverageWithSubject[]) => AverageWithSubject[];
  passingData: (data: AverageWithSubject[]) => AverageWithSubject[];
} = {
  data: [
    {
      grades: {
        id: 91,
        value: 4.7,
        subject_fk: 63,
        description: "Example economy grade",
        weight: 1,
        date: new Date("2024-05-15T14:23:21.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 63,
        name: "Economy - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 92,
        value: 3.6,
        subject_fk: 61,
        description: "Example maths grade",
        weight: 2,
        date: new Date("2024-05-21T13:21:00.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 61,
        name: "Maths - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 93,
        value: 5.4,
        subject_fk: 62,
        description: "Example physics grade",
        weight: 1,
        date: new Date("2024-05-24T22:00:00.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 62,
        name: "Physics - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 94,
        value: 4.1,
        subject_fk: 63,
        description: "Another example economy grade",
        weight: 1,
        date: new Date("2024-05-25T22:00:00.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 63,
        name: "Economy - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 95,
        value: 3.3,
        subject_fk: 61,
        description: "Another example maths grade",
        weight: 0.5,
        date: new Date("2024-05-27T10:00:00.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 61,
        name: "Maths - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 96,
        value: 6,
        subject_fk: 62,
        description: "Another example physics grade",
        weight: 1,
        date: new Date("2024-05-28T10:12:12.000Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 62,
        name: "Physics - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 97,
        value: 5.5,
        subject_fk: 63,
        description: null,
        weight: 1,
        date: new Date("2024-05-28T14:18:54.623Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 63,
        name: "Economy - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      grades: {
        id: 98,
        value: 5.6,
        subject_fk: 61,
        description: null,
        weight: 1,
        date: new Date("2024-05-28T14:19:25.259Z"),
        category_fk: null,
        userId: null,
      },
      subjects: {
        id: 61,
        name: "Maths - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
  ],
  averageData: [
    {
      average: {
        subjectId: 63,
        gradeAverage: 4.766666666666667,
        gradeSum: 14.3,
        gradeWeightedSum: 14.3,
        gradeWeightedAmount: 3,
        gradeAmount: 3,
        passing: true,
      },
      subject: {
        id: 63,
        name: "Economy - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      average: {
        subjectId: 61,
        gradeAverage: 4.128571428571428,
        gradeSum: 12.5,
        gradeWeightedSum: 14.45,
        gradeWeightedAmount: 3.5,
        gradeAmount: 3,
        passing: true,
      },
      subject: {
        id: 61,
        name: "Maths - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
    {
      average: {
        subjectId: 62,
        gradeAverage: 5.7,
        gradeSum: 11.4,
        gradeWeightedSum: 11.4,
        gradeWeightedAmount: 2,
        gradeAmount: 2,
        passing: true,
      },
      subject: {
        id: 62,
        name: "Physics - Demo",
        weight: 1,
        category_fk: null,
        userId: null,
      },
    },
  ],
  failingData: (data: AverageWithSubject[]) =>
    data.filter(
      (average: AverageWithSubject) => average.average?.passing === false
    ),
  passingData: (data: AverageWithSubject[]) =>
    data.filter((average: AverageWithSubject) => average.average?.passing),
};
