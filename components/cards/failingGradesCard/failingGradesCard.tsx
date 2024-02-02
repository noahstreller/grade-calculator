"use client"
import Grade from "@/lib/entities/grade";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import appGlobals from "@/lib/app.globals";
import Subjects from "@/lib/entities/subject";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import { useState, useEffect } from "react";


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