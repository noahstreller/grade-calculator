import GradeDTO from "./dtos/gradeDTO";

export default class GradeInfo {
    static getGradeInformation(grade: GradeDTO) {
        return `Grade: ${grade.value} | Subject: ${grade.subject} | Weight: ${grade.weight} | Date: ${grade.date}`;
    }
}