"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Grade from "@/lib/entities/grade";
import { columns } from "./columns";
import useTranslation from "next-translate/useTranslation";
import { DataTable } from "./data-table";

export function AllGrades({ data, setData, refresh }: { data: Grade[], setData: Function, refresh: Function}) {
    const { t, lang } = useTranslation('common');

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Grades</CardTitle>
                <CardDescription>All recent grades are listed here</CardDescription>
                <Button onClick={() => {new Grade(Math.random() + 3.5, "Naturwissenschaften und Technik"); refresh();}}>{t("grades.add") + " nt"}</Button>
                <Button onClick={() => {new Grade(Math.random() + 3.5, "Mathematik"); refresh();}}>{t("grades.add") + " ma"}</Button>
                <Button onClick={() => {new Grade(Math.random() + 3.5, "Englisch"); refresh();}}>{t("grades.add") + " en"}</Button>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} /> 
            </CardContent>
        </Card>
    )
}