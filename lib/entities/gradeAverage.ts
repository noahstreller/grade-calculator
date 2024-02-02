import Grade from "./grade";

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
}