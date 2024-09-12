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
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isMobile } = useDevice();
  const { t } = useTranslation("common");

  const PAGE_TABS = [
    {
      title: (
        <div className="flex flex-row items-center gap-2">
          <Sparkles className="size-4" />
          {t("getting_started")}
        </div>
      ),
      value: "start",
      content: <GettingStartedTab />,
    },
    {
      title: (
        <div className="flex flex-row items-center gap-2">
          <Info className="size-4" />
          {t("learn_more")}
        </div>
      ),
      value: "about",
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("about_this_project")}</CardTitle>
            <CardDescription>
              {t("some_boring_additional_information_about_this_project")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="hidden lg:flex flex-col">
              <CardBoard>
                <CardBoard row>
                  <CardBoard>
                    <Card className="shadow-md">
                      <CardHeader>
                        <CardTitle>{t("description")}</CardTitle>
                      </CardHeader>
                      <CardContent className="gap-5 flex flex-col">
                        <p>
                          {t(
                            "this_project_is_a_grade_calculator_dashboard_it_allows_for_some_customization_for_example_you_are_able_to_define_the_grading_scale_yourself_as_of_right_now_it"
                          )}
                          t{" "}
                          <Highlight colorName="green">
                            {t("supports_only_numeric_scales")}
                          </Highlight>{" "}
                          and{" "}
                          <Highlight colorName="red">
                            {t("does_not_support_letter_grades")}
                          </Highlight>
                          .
                        </p>
                        <p>
                          {t("this_project_uses_some_components_from")}
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
                              {t("aceternity_ui")}{" "}
                            </a>
                          </Highlight>
                          .
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="shadow-xl">
                      <CardHeader>
                        <CardTitle>{t("getting_started-0")}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-5">
                        <p>
                          {t("this_grade_calculator_features_a")}{" "}
                          <Highlight colorName="yellow">
                            {t("cloud_synced")}
                          </Highlight>
                          {t("and_a")}a{" "}
                          <Highlight colorName="yellow">legacy</Highlight>{" "}
                          {t(
                            "version_which_stores_all_data_locally_in_your_browser"
                          )}{" "}
                        </p>
                        <p>
                          {t(
                            "to_use_the_cloud_synced_version_you_need_to_authenticate_first_to_access_the_legacy_version"
                          )}{" "}
                          <Highlight colorName="blue">
                            <a
                              target="_blank"
                              href="https://legacy.grades.nstr.dev"
                            >
                              {t("click_here")}{" "}
                            </a>
                          </Highlight>
                          <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                            <Button className="w-full shadow-md" asChild>
                              <Link href={"/login"}>
                                <Sparkles className="size-4 mr-2 flex-shrink-0" />
                                {isMobile
                                  ? t("to_the_app")
                                  : t("continue_to_the_app")}
                              </Link>
                            </Button>
                            <Button
                              className="w-full shadow-md"
                              variant={"secondary"}
                              asChild
                            >
                              <Link href={"https://legacy.grades.nstr.dev"}>
                                <Globe className="size-4 mr-2 flex-shrink-0" />
                                {isMobile
                                  ? t("legacy")
                                  : t("use_the_legacy_version")}
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
                        <CardTitle>{t("source_code")}</CardTitle>
                      </CardHeader>
                      <CardContent className="gap-5 flex flex-col">
                        <p>
                          {t(
                            "you_can_find_the_source_code_for_this_project_on_github"
                          )}{" "}
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
                            {t("view_on_github")}{" "}
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
                      <CardTitle>{t("getting_started-1")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">
                      <p>
                        {t("this_grade_calculator_features_a-0")}a{" "}
                        <Highlight colorName="yellow">
                          {t("cloud_synced-0")}
                        </Highlight>
                        {t("and_a-0")}{" "}
                        <Highlight colorName="yellow">legacy</Highlight>{" "}
                        {t(
                          "version_which_stores_all_data_locally_in_your_browser-0"
                        )}{" "}
                      </p>
                      <p>
                        {t(
                          "to_use_the_cloud_synced_version_you_need_to_authenticate_first_to_access_the_legacy_version-0"
                        )}
                        ,{" "}
                        <Highlight colorName="blue">
                          <a
                            target="_blank"
                            href="https://legacy.grades.nstr.dev"
                          >
                            {t("click_here-0")}{" "}
                          </a>
                        </Highlight>
                        <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                          <Button className="w-full shadow-md" asChild>
                            <Link href={"/login"}>
                              <Sparkles className="size-4 mr-2 flex-shrink-0" />
                              {isMobile
                                ? t("to_the_app-0")
                                : t("continue_to_the_app-0")}
                            </Link>
                          </Button>
                          <Button
                            className="w-full shadow-md"
                            variant={"secondary"}
                            asChild
                          >
                            <Link href={"https://legacy.grades.nstr.dev"}>
                              <Globe className="size-4 mr-2 flex-shrink-0" />
                              {isMobile
                                ? t("legacy-0")
                                : t("use_the_legacy_version-0")}
                            </Link>
                          </Button>
                        </div>
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle>{t("about_this_project-0")}</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-5 flex flex-col">
                      <p>
                        {t(
                          "this_project_is_a_grade_calculator_dashboard_it_allows_for_some_customization_for_example_you_are_able_to_define_the_grading_scale_yourself_as_of_right_now_it-0"
                        )}
                        t{" "}
                        <Highlight colorName="green">
                          {t("supports_only_numeric_scales-0")}{" "}
                        </Highlight>{" "}
                        and{" "}
                        <Highlight colorName="red">
                          {t("does_not_support_letter_grades-0")}{" "}
                        </Highlight>
                        .
                      </p>
                      <p>
                        {t("this_project_uses_some_components_from-0")}m{" "}
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
                            {t("aceternity_ui-0")}{" "}
                          </a>
                        </Highlight>
                        .
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-md mb-5">
                    <CardHeader>
                      <CardTitle>{t("source_code-0")}</CardTitle>
                    </CardHeader>
                    <CardContent className="gap-5 flex flex-col">
                      <p>
                        {t(
                          "you_can_find_the_source_code_for_this_project_on_github-0"
                        )}{" "}
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
                          {t("view_on_github-0")}{" "}
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
  const { t } = useTranslation("common");
  return (
    <CardBoard row={!isMobile}>
      <CardBoard>
        <Card>
          <CardHeader>
            <CardTitle>{t("get_started_now")}</CardTitle>
            <CardDescription>
              {t("you_can_start_using_the_grade_calculator_right_away")}{" "}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            <p>
              {t("this_grade_calculator_features_a-1")}a{" "}
              <Highlight colorName="yellow">{t("cloud_synced-1")}</Highlight>
              {t("and_a-1")} <Highlight colorName="yellow">legacy</Highlight>{" "}
              {t(
                "version_which_stores_all_data_locally_in_your_browser_the_legacy_version_is_unmaintained_and_will_not_receive_any_updates"
              )}{" "}
            </p>
            <p>
              {t(
                "to_use_the_cloud_synced_version_you_need_to_authenticate_first_to_access_the_legacy_version-1"
              )}
              ,{" "}
              <Highlight colorName="blue">
                <a target="_blank" href="https://legacy.grades.nstr.dev">
                  {t("click_here-1")}{" "}
                </a>
              </Highlight>
              <div className="flex justify-center gap-5 mt-5 xl:flex-row flex-col">
                <Button className="w-full shadow-md" asChild>
                  <Link href={"/login"}>
                    <Sparkles className="size-4 mr-2 flex-shrink-0" />
                    {isMobile ? t("to_the_app-1") : t("continue_to_the_app-1")}
                  </Link>
                </Button>
                <Button
                  className="w-full shadow-md"
                  variant={"secondary"}
                  asChild
                >
                  <Link href={"https://legacy.grades.nstr.dev"}>
                    <Globe className="size-4 mr-2 flex-shrink-0" />
                    {isMobile ? t("legacy-1") : t("use_the_legacy_version-1")}
                  </Link>
                </Button>
              </div>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("screenshot")}</CardTitle>
            <CardDescription>
              {t("this_is_what_the_grade_calculator_looks_like")}{" "}
            </CardDescription>
            <CardContent className="flex flex-col gap-4 p-3">
              {theme.resolvedTheme === "dark" ? (
                <>
                  <Image
                    src={"/screenshot-dark.png"}
                    alt={t("screenshot_dark_mode")}
                    className="w-full border-2 border-muted rounded-md"
                    width="2213"
                    height="1941"
                  />
                  <Link
                    href={"/screenshot-dark.png"}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "flex flex-row gap-2 w-fit justify-center"
                    )}
                  >
                    {t("open_image")} <ExternalLinkIcon className="size-4" />
                  </Link>
                </>
              ) : (
                <>
                  <Image
                    src={"/screenshot-light.png"}
                    alt={t("screenshot_light_mode")}
                    className="w-full border-2 border-muted rounded-md"
                    width="2213"
                    height="1941"
                  />
                  <Link
                    href={"/screenshot-light.png"}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "flex flex-row gap-2 w-fit justify-center"
                    )}
                  >
                    {t("open_image-0")} <ExternalLinkIcon className="size-4" />
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
  const { t } = useTranslation("common");
  const demos: DemoType[] = [
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <LineChartIcon className="size-4 text-muted-foreground" />
          {t("grades.grades")}{" "}
        </span>
      ),
      value: "grade-overview",
    },
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <GroupIcon className="size-4 text-muted-foreground" />
          {t("averages")}{" "}
        </span>
      ),
      value: "average-overview",
    },
    {
      title: (
        <span className="flex flex-row gap-2 justify-center items-center">
          <CalculatorIcon className="size-4 text-muted-foreground" />
          {t("calculator")}{" "}
        </span>
      ),
      value: "required-grades",
    },
  ];

  const [selected, setSelected] = useState<string>("grade-overview");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("demo")}</CardTitle>
        <CardDescription>
          {t("you_can_try_out_different_demos_here")}
        </CardDescription>
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
