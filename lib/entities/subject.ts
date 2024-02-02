import appGlobals from "../app.globals";
import { GradeAverage } from "./gradeAverage";

export default class Subjects {
    private static subjects: Set<string> = new Set<string>();

    static add(subject: string): string {
        this.subjects.add(subject);
        return subject;
    }

    static get(): Set<string> {
        return this.subjects;
    }

    static clear(): Set<string> {
        this.subjects.clear();
        return this.subjects;
    }

    static remove(subject: string): boolean {
        this.subjects.delete(subject);
        return !this.subjects.has(subject);
    }

    static doesSubjectPass (subject: string) {
        let average = GradeAverage.getSubjectAverage(subject);
        return average >= appGlobals.passingGrade;
    }

    static doesSubjectFail (subject: string) {
        let average = GradeAverage.getSubjectAverage(subject);
        return average < appGlobals.passingGrade;
    }

    static getFailingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let failing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (this.doesSubjectFail(subject)) {
                failing.push(new GradeAverage(subject, GradeAverage.getSubjectAverage(subject), false));
            }
        }, subjects);
        return failing;
    }

    static getPassingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let passing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (this.doesSubjectPass(subject)) {
                passing.push(new GradeAverage(subject, GradeAverage.getSubjectAverage(subject), true));
            }
        }, subjects);
        return passing;
    }
}