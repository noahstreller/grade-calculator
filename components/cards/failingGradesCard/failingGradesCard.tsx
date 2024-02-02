import Grade from "@/lib/entities/grade";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import appGlobals from "@/lib/app.globals";
import Subjects from "@/lib/entities/subject";
import { GradeAverage } from "@/lib/entities/gradeAverage";


export default function FailingGradesCard (){
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

    function doesSubjectFail (subject: string) {
        let average = getSubjectAverage(subject);
        return average < appGlobals.passingGrade;
    }

    function getFailingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let failing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (doesSubjectFail(subject)) {
                failing.push(new GradeAverage(subject, getSubjectAverage(subject), false));
            }
        }, subjects);
        return failing;
    }

    return (
        <Card>
            <CardHeader>Failing Subjects</CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={getFailingSubjects()} />
            </CardContent>
        </Card>
    )
}