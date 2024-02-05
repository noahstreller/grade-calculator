"use client"
import { GradeAverage } from "@/lib/entities/gradeAverage";
import useTranslation from "next-translate/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";


export default function PassingGradesCard({ data, setData }: { data: GradeAverage[], setData: Function}){
    const {t} = useTranslation("common");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("subjects.passing-subjects")}</CardTitle>
                <CardDescription>{t("subjects.passing-subjects-desc")}</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} />
            </CardContent>
        </Card>
    )
}