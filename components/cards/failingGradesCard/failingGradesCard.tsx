"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";


export default function FailingGradesCard ({ data, setData }: { data: GradeAverage[], setData: Function }){
    return (
        <Card>
            <CardHeader>
                <CardTitle>Failing Subjects</CardTitle>
                <CardDescription>These are the subjects you are failing</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} />
            </CardContent>
        </Card>
    )
}