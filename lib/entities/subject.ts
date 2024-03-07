import appGlobals from "../app.globals";
import Grade from "./grade";
import { GradeAverage } from "./gradeAverage";

export default class Subjects {
    private static subjects: Set<string> = new Set<string>();

    static add(subject: string): string {
        for (let value of Subjects.subjects) {
            if (value.toLowerCase() === subject.toLowerCase()) {
                return value;
            }
        }

        this.subjects.add(subject);
        localStorage.setItem('subjects', JSON.stringify(Array.from(this.subjects)));
        return subject;
    }

    static get(): Set<string> {
        return this.subjects;
    }

    static load(): Set<string> {
        let subjects: string[] = JSON.parse(localStorage.getItem('subjects') || '[]');
        this.subjects = new Set<string>(subjects);
        return this.subjects;
    }

    static clear(): Set<string> {
        this.subjects.clear();
        localStorage.setItem('subjects', JSON.stringify(Array.from(this.subjects)));
        return this.subjects;
    }

    static remove(subject: string): boolean {
        Grade.deleteAllBySubject(subject);
        this.subjects.delete(subject);
        localStorage.setItem('subjects', JSON.stringify(Array.from(this.subjects)));
        return !this.subjects.has(subject);
    }

    static doesSubjectPass (subject: string) {
        let average = GradeAverage.getSubjectAverage(subject);
        if (appGlobals.passingInverse) return average <= appGlobals.passingGrade;
        return average >= appGlobals.passingGrade;
    }

    static doesSubjectFail (subject: string) {
        let average = GradeAverage.getSubjectAverage(subject);
        if (appGlobals.passingInverse) return average > appGlobals.passingGrade;
        return average < appGlobals.passingGrade;
    }

    static getFailingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let failing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (this.doesSubjectFail(subject)) {
                failing.push(new GradeAverage(subject, GradeAverage.getSubjectAverage(subject), false, Grade.getBySubject(subject)));
            }
        }, subjects);
        return failing;
    }

    static getPassingSubjects () {
        let subjects: Set<string> = Subjects.get();
        let passing: GradeAverage[] = [];
        subjects.forEach(subject => {
            if (this.doesSubjectPass(subject)) {
                passing.push(new GradeAverage(subject, GradeAverage.getSubjectAverage(subject), true, Grade.getBySubject(subject)));
            }
        }, subjects);
        return passing;
    }

    static doesSubjectExist (subject: string) {
        return this.subjects.has(subject);
    }
}