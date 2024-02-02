import Grade from "./grade";
import Subjects from "./subject";

export class GradeAverage {
    passing: boolean;
    subject: string;
    gradeAverage: number;

    constructor(subject: string, gradeAverage: number, passing: boolean = false) {
        this.passing = passing;
        this.gradeAverage = gradeAverage;
        this.subject = subject;
    }
    
    static getSubjectAverage (subject: string) {
        let grades = Grade.getBySubject(subject);
        let count = grades.length;
        let sum = 0;
        for (let grade of grades) {
            sum += grade.getValue();
        }
        return sum / count;
    }

    static get () {
        let subjects: Set<string> = Subjects.get();
        let averages: GradeAverage[] = [];
        subjects.forEach(subject => {
            let average = new GradeAverage(subject, this.getSubjectAverage(subject), false);
            if (Subjects.doesSubjectPass(subject)) {
                average.passing = true;
            }
            averages.push(average);
        }, subjects);
        return averages;
    }
}