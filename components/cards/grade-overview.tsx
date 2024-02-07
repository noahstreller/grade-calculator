import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
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
    return grade.getValue();
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
        <div className="bg-transparent rounded-xl border-solid border-2 border-border p-3 backdrop-blur-[8px]">
          {Grade.doesGradePass(payload[0].value) ? (
            <p>
              <b>Grade: </b>
              <span className="text-green-400">{`${payload[0].value}`}</span>
            </p>
          ) : (
            <p>
              <b>Grade: </b>
              <span className="text-red-400">{`${payload[0].value}`}</span>
            </p>
          )}
          <p>
            <b>Subject: </b>
            {label
              ? data[Number(label)].getSubject()
              : data[Number(0)].getSubject()}
          </p>
          <p>
            <b>Date: </b>
            {label
              ? data[Number(label)].getDate().toLocaleString()
              : data[Number(0)].getDate().toLocaleString()}
          </p>
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
      <CardContent className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line dataKey={getGrade} stroke="#000000" className="dark:invert" />
            <Tooltip content={<CustomTooltip />} />
            <YAxis reversed={appGlobals.passingInverse} tickCount={6} domain={[appGlobals.minimumGrade, appGlobals.maximumGrade]} />
            <XAxis tick={false} />
            <ReferenceLine y={appGlobals.passingGrade} strokeDasharray="3 5" stroke="grey" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardContent>
        <CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("subjects.passing-subjects")}</CardHeader>
              <CardContent>
                <b className="block text-5xl text-center items-center self-center text-green-400">
                  {
                    passingData.filter((gradeAverage) =>
                      gradeAverage.passing
                    ).length
                  }
                </b>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("subjects.failing-subjects")}</CardHeader>
              <CardContent>
                <b className="block text-5xl text-center items-center self-center text-red-400">
                  {
                    failingData.filter((gradeAverage) =>
                      !gradeAverage.passing
                    ).length
                  }
                </b>
              </CardContent>
            </Card>
          </CardBoard>
          <CardBoard row>
            <Card>
              <CardHeader>{t("grades.passing-grades")}</CardHeader>
              <CardContent>
                <b className="block text-5xl text-center items-center self-center text-green-400">
                  {
                    data.filter((grade) =>
                      Grade.doesGradePass(grade.getValue())
                    ).length
                  }
                </b>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>{t("grades.failing-grades")}</CardHeader>
              <CardContent>
                <b className="block text-5xl text-center items-center self-center text-red-400">
                  {
                    data.filter(
                      (grade) => !Grade.doesGradePass(grade.getValue())
                    ).length
                  }
                </b>
              </CardContent>
            </Card>
          </CardBoard>
        </CardBoard>
      </CardContent>
    </Card>
  );
}
