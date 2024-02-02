"use client"
import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import { useState, useEffect } from "react";


export default function PassingGradesCard(){
        
    const [data, setData] = useState<GradeAverage[]>([]);

    useEffect(() => {
        const data = Subjects.getPassingSubjects();
        setData(data);
    }, []);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Passing Subjects</CardTitle>
                <CardDescription>These are the subjects you are passing</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} />
            </CardContent>
        </Card>
    )
}