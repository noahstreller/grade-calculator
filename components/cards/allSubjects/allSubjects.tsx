"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Grade from "@/lib/entities/grade";
import Subjects from "@/lib/entities/subject";
import { useState, useEffect } from "react";
import { GradeAverage } from "@/lib/entities/gradeAverage";

export function AllSubjects() {

    const [data, setData] = useState<GradeAverage[]>([]);

    useEffect(() => {
        let averages = GradeAverage.get();
        setData(averages);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Subjects</CardTitle>
                <CardDescription>All subjects are listed here</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} /> 
            </CardContent>
        </Card>
    )
}