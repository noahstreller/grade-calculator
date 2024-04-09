import { Grade } from "@/db/schema";
import appGlobals from "@/lib/app.globals";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { getDateOrTime } from "@/lib/utils";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CardBoard } from "../ui/cardboard";

export function GradeOverview({
  data,
  passingData,
  failingData,
}: {
  data: Grade[];
  passingData: GradeAverage[];
  failingData: GradeAverage[];
}) {
  const { t } = useTranslation("common");

  let getGrade = (grade: Grade) => {
    return grade.value;
  };

  

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: any;
    payload?: any;
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Grade
              </span>
              {
                // Grade.doesGradePass(payload[0].value) ? 
                true ?
                <span className="text-green-400 font-bold">{`${payload[0].value}`}</span> : 
                <span className="text-red-400 font-bold">{`${payload[0].value}`}</span>
              }
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Subject
              </span>
              {/* <span className="font-bold text-muted-foreground">
                {
                  label
                  ? truncateText(data[Number(label)].subject_fk!, 20).text
                  : truncateText(data[Number(0)].subject_fk!, 20).text
                }
              </span> */}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Date
              </span>
              <span className="font-bold text-muted-foreground">
                {label
                  ? getDateOrTime(data[Number(label)].date!)
                  : getDateOrTime(data[Number(0)].date!)}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("overview.title")}</CardTitle>
        <CardDescription>{t("overview.description")}</CardDescription>
      </CardHeader>
      {data.length === 0 ? (
        <CardContent>
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-desc", { count: 1 })}
            </AlertDescription>
          </Alert>
        </CardContent>
      ) : (
        <CardContent className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={data}>
              <Line
                dataKey={getGrade}
                stroke="#000000"
                className="dark:invert"
              />
              <Tooltip content={<CustomTooltip />} />
              <YAxis
                reversed={appGlobals.passingInverse}
                tickCount={6}
                domain={[appGlobals.minimumGrade, appGlobals.maximumGrade]}
              />
              <XAxis tick={false} />
              <ReferenceLine
                y={appGlobals.passingGrade}
                strokeDasharray="3 5"
                stroke="grey"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      )}
      <CardContent>
        <CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("subjects.passing-subjects")}</CardHeader>
              <CardContent>
                {passingData.filter((gradeAverage) => gradeAverage.passing)
                  .length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {
                      passingData.filter((gradeAverage) => gradeAverage.passing)
                        .length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("subjects.failing-subjects")}</CardHeader>
              <CardContent>
                {failingData.filter((gradeAverage) => !gradeAverage.passing)
                  .length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {
                      failingData.filter(
                        (gradeAverage) => !gradeAverage.passing
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
          </CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("grades.passing-grades")}</CardHeader>
              <CardContent>
                {data.filter((grade) => Grade.doesGradePass(grade.getValue()))
                  .length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-green-400">
                    {
                      data.filter((grade) =>
                        Grade.doesGradePass(grade.getValue())
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("grades.failing-grades")}</CardHeader>
              <CardContent>
                {data.filter((grade) => !Grade.doesGradePass(grade.getValue()))
                  .length > 0 ? (
                  <b className="block text-5xl text-center items-center self-center text-red-400">
                    {
                      data.filter(
                        (grade) => !Grade.doesGradePass(grade.getValue())
                      ).length
                    }
                  </b>
                ) : (
                  <b className="block text-5xl text-center items-center self-center text-gray-400">
                    -
                  </b>
                )}
              </CardContent>
            </Card>
          </CardBoard>
        </CardBoard>
      </CardContent>
    </Card>
  );
}
