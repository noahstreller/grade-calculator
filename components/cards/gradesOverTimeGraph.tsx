import Grade from "@/lib/entities/grade";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function GradesOverTimeGraph({ data }: { data: Grade[] }) {
  
  let getGrade = (grade: Grade)=>{return grade.getValue();}

  const CustomTooltip = ({ active, payload, label } : {active?:any, payload?:any, label?:any}) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-transparent rounded-xl border-solid border-2 border-border p-3 backdrop-blur-[4px]">
          <p><b>Grade: </b>{`${payload[0].value}`}</p>
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
        <CardTitle>Grades over time</CardTitle>
        <CardDescription>
          Grades
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[40vh]">
        <ResponsiveContainer>
          <LineChart data={data}>
              <Line  dataKey={getGrade} stroke="#ffffff" dot={false}  />
              <Tooltip content={<CustomTooltip />} />
              <YAxis domain={[1, 6]}  />
              <XAxis />
            </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
