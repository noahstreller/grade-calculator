"use client";
import { AverageOverview } from "@/components/cards/average-overview";
import { GradeOverview } from "@/components/cards/grade-overview";
import { RequiredGrades } from "@/components/cards/required-grades";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useDevice } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { MOCKDATA } from "@/mockdata-export";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import {
  CalculatorIcon,
  ExternalLinkIcon,
  Globe,
  GroupIcon,
  Info,
  LineChartIcon,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isMobile } = useDevice();

  const PAGE_TABS = [
    {
      title: (
        <div className="flex flex-row items-center gap-2">
          <Sparkles className="size-4" />
          Getting started
        </div>
      ),
      value: "start",
      content: <GettingStartedTab />,
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
                          <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                            <Button className="w-full shadow-md" asChild>
                              <Link href={"/login"}>
                                <Sparkles className="size-4 mr-2 flex-shrink-0" />
                                {isMobile
                                  ? "To the app"
                                  : "Continue to the app"}
                              </Link>
                            </Button>
                            <Button
                              className="w-full shadow-md"
                              variant={"secondary"}
                              asChild
                            >
                              <Link href={"https://legacy.grades.nstr.dev"}>
                                <Globe className="size-4 mr-2 flex-shrink-0" />
                                {isMobile ? "Legacy" : "Use the legacy version"}
                              </Link>
                            </Button>
                          </div>
                        </p>
                      </CardContent>
                    </Card>
                  </CardBoard>
                  <CardBoard>
                    <CardStack items={REVIEW_CARDS} offset={7} />
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
                              "https://github.com/noahstreller/grade-calculator"
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
                        <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                          <Button className="w-full shadow-md" asChild>
                            <Link href={"/login"}>
                              <Sparkles className="size-4 mr-2 flex-shrink-0" />
                              {isMobile ? "To the app" : "Continue to the app"}
                            </Link>
                          </Button>
                          <Button
                            className="w-full shadow-md"
                            variant={"secondary"}
                            asChild
                          >
                            <Link href={"https://legacy.grades.nstr.dev"}>
                              <Globe className="size-4 mr-2 flex-shrink-0" />
                              {isMobile ? "Legacy" : "Use the legacy version"}
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
                            "https://github.com/noahstreller/grade-calculator"
                          }
                        >
                          <SiGithub className="size-4 m-2" />
                          View on GitHub
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <CardStack items={REVIEW_CARDS} offset={7} />
                </CardBoard>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];
  return (
    <div className="w-screen h-fit">
      <div className="[perspective:1000px] h-full relative b flex flex-col mx-auto w-11/12">
        <Tabs tabs={PAGE_TABS} />
      </div>
    </div>
  );
}

const REVIEW_CARDS = [
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

function GettingStartedTab() {
  const { isMobile } = useDevice();
  const theme = useTheme();
  const router = useRouter();
  return (
    <CardBoard row={!isMobile}>
      <CardBoard>
        <Card>
          <CardHeader>
            <CardTitle>Get started now</CardTitle>
            <CardDescription>
              You can start using the grade calculator right away.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <p>
              This grade calculator features a{" "}
              <Highlight colorName="yellow">cloud synced</Highlight>, and a{" "}
              <Highlight colorName="yellow">legacy</Highlight> version, which
              stores all data locally in your browser. The legacy version is
              unmaintained and will not receive any updates.
            </p>
            <p>
              To use the cloud synced version, you need to authenticate first.
              To access the legacy version,{" "}
              <Highlight colorName="blue">
                <a target="_blank" href="https://legacy.grades.nstr.dev">
                  click here
                </a>
              </Highlight>
              <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                <Button className="w-full shadow-md" asChild>
                  <Link href={"/login"}>
                    <Sparkles className="size-4 mr-2 flex-shrink-0" />
                    {isMobile ? "To the app" : "Continue to the app"}
                  </Link>
                </Button>
                <Button
                  className="w-full shadow-md"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={"https://legacy.grades.nstr.dev"}>
                    <Globe className="size-4 mr-2 flex-shrink-0" />
                    {isMobile ? "Legacy" : "Use the legacy version"}
                  </Link>
                </Button>
              </div>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Screenshot</CardTitle>
            <CardDescription>
              This is what the grade calculator looks like.
            </CardDescription>
            <CardContent className="flex flex-col gap-4 p-3">
              {theme.resolvedTheme === "dark" ? (
                <>
                  <Image
                    src={"/screenshot-dark.png"}
                    alt={"Screenshot Dark Mode"}
                    className="w-full border-2 border-muted rounded-md"
                    width="2213"
                    height="1941"
                  />
                  <Link
                    href={"/screenshot-dark.png"}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "flex flex-row gap-2 w-fit justify-center",
                    )}
                  >
                    Open image <ExternalLinkIcon className="size-4" />
                  </Link>
                </>
              ) : (
                <>
                  <Image
                    src={"/screenshot-light.png"}
                    alt={"Screenshot Light Mode"}
                    className="w-full border-2 border-muted rounded-md"
                    width="2213"
                    height="1941"
                  />
                  <Link
                    href={"/screenshot-light.png"}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "flex flex-row gap-2 w-fit justify-center",
                    )}
                  >
                    Open image <ExternalLinkIcon className="size-4" />
                  </Link>
                </>
              )}
            </CardContent>
          </CardHeader>
        </Card>
      </CardBoard>
      <Demos />
    </CardBoard>
  );
}

type DemoType = {
  title: ReactNode;
  value: string;
};

const Demos = () => {
  const demos: DemoType[] = [
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <LineChartIcon className="size-4 text-muted-foreground" />
          Grades
        </span>
      ),
      value: "grade-overview",
    },
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <GroupIcon className="size-4 text-muted-foreground" />
          Averages
        </span>
      ),
      value: "average-overview",
    },
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <CalculatorIcon className="size-4 text-muted-foreground" />
          Calculator
        </span>
      ),
      value: "required-grades",
    },
  ];

  const [selected, setSelected] = useState<string>("grade-overview");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo</CardTitle>
        <CardDescription>You can try out different demos here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <DemoSwitcher
          demos={demos}
          selected={selected}
          setSelected={setSelected}
        />
        <motion.div layout>
          {selected === "required-grades" && (
            <RequiredGrades
              className="select-none"
              averageData={MOCKDATA.averageData}
              showPassingGrades
            />
          )}
          {selected === "grade-overview" && (
            <GradeOverview
              className="select-none"
              data={MOCKDATA.data}
              failingData={MOCKDATA.failingData(MOCKDATA.averageData)}
              passingData={MOCKDATA.passingData(MOCKDATA.averageData)}
              animate={false}
            />
          )}
          {selected === "average-overview" && (
            <AverageOverview
              className="select-none"
              data={MOCKDATA.data}
              averageData={MOCKDATA.averageData}
              animate={false}
            />
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
};

const DemoSwitcher = ({
  demos,
  selected,
  setSelected,
}: {
  demos: DemoType[];
  selected: string;
  setSelected: Function;
}) => {
  const { isMobile } = useDevice();

  if (isMobile)
    return (
      <div className="flex flex-row items-center justify-center [perspective:1000px]">
        <div className="relative overflow-hidden no-visible-scrollbar max-w-full w-fit bg-transparent">
          {demos.map((demo) => (
            <button
              key={demo.value}
              onClick={() => {
                setSelected(demo.value);
              }}
              className={"mx-1 my-1 px-4 py-1.5 rounded-full bg-muted/[0.3]"}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {selected === demo.value && (
                <motion.div
                  layoutId="clickedbutton-demos"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={"absolute inset-0 bg-muted rounded-full "}
                />
              )}

              <span className="relative block text-foreground">
                {demo.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex flex-row items-center justify-center [perspective:1000px]">
      <div className="relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-fit border-muted border-2 rounded-full p-1.5 shadow-md">
        {demos.map((demo) => (
          <button
            key={demo.value}
            onClick={() => {
              setSelected(demo.value);
            }}
            className={"px-4 py-1.5 rounded-full"}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {selected === demo.value && (
              <motion.div
                layoutId="clickedbutton-demos"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={"absolute inset-0 bg-muted shadow-lg rounded-full "}
              />
            )}

            <span className="relative block text-foreground">{demo.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
