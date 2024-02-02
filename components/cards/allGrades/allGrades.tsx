"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Grade from "@/lib/entities/grade";
import Subjects from "@/lib/entities/subject";
import { useState, useEffect } from "react";

export function AllGrades() {

    const [data, setData] = useState<Grade[]>([]);

    useEffect(() => {
        Subjects.add("Maths");
        Subjects.add("English");
        Subjects.add("Science");
        Subjects.add("History");
        Subjects.add("Geography");
        Subjects.add("PE");
        Subjects.add("French");
        Subjects.add("German");
        Subjects.add("Spanish");
        Subjects.add("Art");

        new Grade(5.3, "Maths");
        new Grade(5, "Maths");
        new Grade(4.2, "English");
        new Grade(5, "English");
        new Grade(5, "Science");
        new Grade(5, "Science");
        new Grade(2, "PE");
        new Grade(2, "PE");
        new Grade(2, "PE");
        new Grade(2, "PE");
        new Grade(2, "PE");
        new Grade(5, "PE");
        

        const grades = Grade.get();
        setData(grades);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Grades</CardTitle>
                <CardDescription>All recent grades are listed here</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} /> 
            </CardContent>
        </Card>
    )
}