"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Grade from "@/lib/entities/grade";
import Subjects from "@/lib/entities/subject";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function AllGrades({ data, setData }: { data: Grade[], setData: Function }) {


    function refresh() {
        let grades = Grade.get();
        setData([...grades]);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Grades</CardTitle>
                <CardDescription>All recent grades are listed here</CardDescription>

            </CardHeader>
            <CardContent>
                <Button onClick={() => {new Grade(1, "PE"); refresh()}}>Refresh</Button>
                <DataTable columns={columns()} data={data} /> 
            </CardContent>
        </Card>
    )
}