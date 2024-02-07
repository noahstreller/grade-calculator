import Grade from "./grade";
import Subjects from "./subject";

export class GradeAverage {
    passing: boolean | "unknown";
    subject: string | null;
    gradeAverage: number;
    grades: Grade[];

    constructor(subject: string | null = null, gradeAverage: number, passing: boolean | "unknown" = "unknown", grades: Grade[] = []) {
        this.passing = passing;
        this.gradeAverage = gradeAverage;
        this.subject = subject;
        this.grades = grades;
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
            let average = new GradeAverage(subject, this.getSubjectAverage(subject), false, Grade.getBySubject(subject));
            if (Subjects.doesSubjectPass(subject)) {
                average.passing = true;
            }
            averages.push(average);
        }, subjects);
        return averages;
    }

    static getAverageFromGradeAverages(averages: GradeAverage[]): GradeAverage {
        if (averages.length === 0) {
            return new GradeAverage(null, 0);
        }
        let sum = 0;
        let count = 0;
        for (let average of averages) {
            sum += average.gradeAverage;
            count++;
        }
        return new GradeAverage(null, sum / count);
    }

    static getAverageFromGrades(grades: Grade[]): GradeAverage {
        if (grades.length === 0) {
            return new GradeAverage(null, 0);
        }
        let sum = 0;
        let count = 0;
        for (let grade of grades) {
            sum += grade.getValue();
            count++;
        }
        return new GradeAverage(null, sum / count);
    }
}