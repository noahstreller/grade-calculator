export class GradeAverage {
    passing: boolean;
    subject: string;
    gradeAverage: number;

    constructor(subject: string, gradeAverage: number, passing: boolean = false) {
        this.passing = passing;
        this.gradeAverage = gradeAverage;
        this.subject = subject;
    }
}