import Grade from "@/lib/entities/grade";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DataTable } from "../ui/data-table";
import { columns } from "./columns";


export default function PassingGradesCard(){
    function getPassingGrades (): Grade[] {
        const grades = Grade.get();
        const passingGrades = grades.filter(grade => grade.getValue() >= 4);
        return passingGrades;
    }

    return (
        <Card>
            <CardHeader>Passing Grades</CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={getPassingGrades()} />
            </CardContent>
        </Card>
    )
}