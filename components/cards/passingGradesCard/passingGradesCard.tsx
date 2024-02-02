import Grade from "@/lib/entities/grade";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import appGlobals from "@/lib/app.globals";
import Subjects from "@/lib/entities/subject";
import { GradeAverage } from "@/lib/entities/gradeAverage";


export default function PassingGradesCard(){
    function doesGradePass (grade: Grade): boolean {
        return grade.getValue() >= appGlobals.passingGrade;
    }

    function getSubjectAverage (subject: string) {
        let grades = Grade.getBySubject(subject);
        let count = grades.length;
        let sum = 0;
        for (let grade of grades) {
            sum += grade.getValue();
        }
        return sum / count;
    }

    function doesSubjectPass (subject: string) {
        let average = getSubjectAverage(subject);
        return average >= appGlobals.passingGrade;
    }

    function getPassingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let passing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (doesSubjectPass(subject)) {
                passing.push(new GradeAverage(subject, getSubjectAverage(subject), true));
            }
        }, subjects);
        return passing;
    }

    return (
        <Card>
            <CardHeader>Passing Subjects</CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={getPassingSubjects()} />
            </CardContent>
        </Card>
    )
}