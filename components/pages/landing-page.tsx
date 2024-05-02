"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardStack, Highlight } from "@/components/ui/card-stack";
import { CardBoard } from "@/components/ui/cardboard";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col gap-10 w-4/5 self-center m-auto">
      <h1 className="relative z-10 text-3xl md:text-5xl text-foreground text-center font-sans font-bold">
        Grade Calculator
      </h1>
      <div className="hidden lg:flex flex-col">
        <CardBoard>
          <CardBoard row>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>About this project</CardTitle>
              </CardHeader>
              <CardContent className="gap-5 flex flex-col">
                <p>
                  This project is a grade calculator / dashboard. It allows for
                  some customization; for example, you are able to define the
                  grading scale yourself. As of right now, it{" "}
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
                  <Highlight colorName="yellow">cloud synced</Highlight>, and a{" "}
                  <Highlight colorName="yellow">legacy</Highlight> version,
                  which stores all data locally in your browser.
                </p>
                <p>
                  To use the cloud synced version, you need to authenticate
                  first. To access the legacy version,{" "}
                  <Highlight colorName="blue">
                    <a target="_blank" href="https://legacy.grades.nstr.dev">
                      click here
                    </a>
                  </Highlight>
                  <div className="flex justify-center gap-5 m-5 xl:flex-row flex-col">
                    <Button className="w-full shadow-md" asChild>
                      <Link href={"/login"}>Continue to the app</Link>
                    </Button>
                    <Button
                      className="w-full shadow-md"
                      variant={"secondary"}
                      asChild
                    >
                      <Link href={"https://legacy.grades.nstr.dev"}>
                        Use the legacy version
                      </Link>
                    </Button>
                  </div>
                </p>
              </CardContent>
            </Card>
            <CardBoard>
              <CardStack items={CARDS} offset={7} />
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Source Code</CardTitle>
                </CardHeader>
                <CardContent className="gap-5 flex flex-col">
                  <p>
                    You can find the source code for this project on GitHub.
                  </p>
                  <Button variant={"secondary"} className="shadow-lg" asChild>
                    <Link
                      href={"https://github.com/noahstreller/notenrechner-next"}
                    >
                      <Github className="size-4 m-2" />
                      View on GitHub
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </CardBoard>
          </CardBoard>
        </CardBoard>
        <div className="flex justify-start m-20"></div>
      </div>
      <div className="flex flex-col gap-10 w-4/5 self-center m-auto">
        <div className="flex lg:hidden flex-col">
          <CardBoard>
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Getting started</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <p>
                  This grade calculator features a{" "}
                  <Highlight colorName="yellow">cloud synced</Highlight>, and a{" "}
                  <Highlight colorName="yellow">legacy</Highlight> version,
                  which stores all data locally in your browser.
                </p>
                <p>
                  To use the cloud synced version, you need to authenticate
                  first. To access the legacy version,{" "}
                  <Highlight colorName="blue">
                    <a target="_blank" href="https://legacy.grades.nstr.dev">
                      click here
                    </a>
                  </Highlight>
                  <div className="flex justify-center gap-5 m-5 xl:flex-row flex-col">
                    <Button className="w-full shadow-md" asChild>
                      <Link href={"/login"}>Continue to the app</Link>
                    </Button>
                    <Button
                      className="w-full shadow-md"
                      variant={"secondary"}
                      asChild
                    >
                      <Link href={"https://legacy.grades.nstr.dev"}>
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
                  This project is a grade calculator / dashboard. It allows for
                  some customization; for example, you are able to define the
                  grading scale yourself. As of right now, it{" "}
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
                <p>You can find the source code for this project on GitHub.</p>
                <Button variant={"secondary"} className="shadow-lg" asChild>
                  <Link
                    href={"https://github.com/noahstreller/notenrechner-next"}
                  >
                    <Github className="size-4 m-2" />
                    View on GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <CardStack items={CARDS} offset={7} />
          </CardBoard>
          <div className="flex justify-start m-20"></div>
        </div>
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
