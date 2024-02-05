import Grade from "@/lib/entities/grade";
import useTranslation from "next-translate/useTranslation";
import { Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function GradeOverview({ data }: { data: Grade[] }) {

  const { t } = useTranslation("common");
  
  let getGrade = (grade: Grade)=>{return grade.getValue();}

  const CustomTooltip = ({ active, payload, label } : {active?:any, payload?:any, label?:any}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-transparent rounded-xl border-solid border-2 border-border p-3 backdrop-blur-[8px]">
          {
            Grade.doesGradePass(payload[0].value)
            ? <p><b>Grade: </b><span className="text-green-400">{`${payload[0].value}`}</span></p>
            : <p><b>Grade: </b><span className="text-red-400">{`${payload[0].value}`}</span></p>
          }
          <p><b>Subject: </b>{label ? data[Number(label)].getSubject() : data[Number(0)].getSubject()}</p>
          <p><b>Date: </b>{label ? data[Number(label)].getDate().toLocaleString() : data[Number(0)].getDate().toLocaleString()}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("overview.title")}</CardTitle>
        <CardDescription>
          {t("overview.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
              <Line  dataKey={getGrade} stroke="#000000" className="dark:invert" />
              <Tooltip content={<CustomTooltip />} />
              <YAxis tickCount={6} domain={[1, 6]}  />
              <XAxis tick={false} />
              <ReferenceLine y="4" strokeDasharray="3 5" stroke="grey"/>
            </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
