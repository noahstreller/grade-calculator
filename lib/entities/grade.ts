import Subjects from "@/lib/entities/subject";
import appGlobals from "../app.globals";
import { InvalidGradeError } from "../errors";
import GradeDTO from "./dtos/gradeDTO";
import GradeInfo from "./gradeInfo";

export default class Grade {
  static grades: Grade[] = [];
  private id: number;
  private value: number;
  private subject: string;
  private weight: number;
  private date: Date;

  constructor(
    id: number = Grade.grades.length + 1,
    value: number,
    subject: string,
    weight: number = 1,
    date: Date = new Date()
  ) {
    this.id = id;
    this.value = value;
    this.subject = subject;
    this.weight = weight;
    this.date = date;
    if (Grade.validate(this)) {
      Grade.grades.push(this);
      localStorage.setItem("grades", JSON.stringify(Grade.grades));
    }
  }

  static validate(grade: Grade): boolean {
    try {
      if(!Subjects.doesSubjectExist(grade.subject)) {
        Subjects.add(grade.subject);
      }

      if (
        grade.value < appGlobals.minimumGrade ||
        grade.value > appGlobals.maximumGrade
      ) {
        throw new InvalidGradeError();
      }
      if (grade.weight < 0) {
        throw new InvalidGradeError();
      }
      if (grade.subject === "") {
        throw new InvalidGradeError();
      }
    } catch (e) {
      console.error(e);
      return false;
    }
    return true;
  }

  static get(): Grade[] {
    return this.grades;
  }

  delete() {
    Grade.deleteById(this.id);
  }

  save() {
    if (Grade.grades.find((grade) => grade.id === this.id)) {
      return;
    }
    Grade.grades.push(this);
    localStorage.setItem("grades", JSON.stringify(Grade.grades));
  }

  static load(): Grade[] {
    let data = localStorage.getItem("grades");
    if (data == "{}" || data == "undefined" || data == "null" || !data) return this.grades;
    let grades: GradeDTO[] = JSON.parse(data);
    this.grades = grades.map((grade) => {
      if (Grade.grades.find((g) => g.id === grade.id)) {
        return Grade.grades.find((g) => g.id === grade.id) as Grade;
      }
      return new Grade(
        grade.id,
        grade.value,
        grade.subject,
        grade.weight,
        new Date(grade.date)
      );
    });
    return this.grades;
  }

  static getById(id: number): Grade {
    let result = this.grades.find((grade) => grade.id === id);
    if (result) {
      return result;
    } else {
      throw new Error("Grade not found");
    }
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
    localStorage.setItem("grades", JSON.stringify(Grade.grades));
  }

  getSubject(): string {
    return this.subject;
  }

  getWeight(): number {
    return this.weight;
  }

  getDate(): Date {
    return this.date;
  }

  static getBySubject(subject: string): Grade[] {
    let result = this.grades.filter((grade) => grade.subject === subject);
    if (result) {
      return result;
    } else {
      throw new Error("No matching Grade was found");
    }
  }

  static deleteById(id: number): void {
    let index = this.grades.findIndex((grade) => grade.id === id);
    if (index !== -1) {
      this.grades.splice(index, 1);
      localStorage.setItem("grades", JSON.stringify(this.grades));
    } else {
      throw new Error("Grade not found");
    }
  }

  static deleteAllBySubject(subject: string): void {
    let index = this.grades.findIndex((grade) => grade.subject === subject);
    while (index !== -1) {
      this.grades.splice(index, 1);
      index = this.grades.findIndex((grade) => grade.subject === subject);
    }
    localStorage.setItem("grades", JSON.stringify(this.grades));
  }

  toDto(): GradeDTO {
    return new GradeDTO(
      this.id,
      this.value,
      this.subject,
      this.weight,
      this.date
    );
  }

  getGradeInformation(): string {
    let info = GradeInfo.getGradeInformation(this.toDto());
    return info;
  }

  doesGradePass(): boolean {
    if (appGlobals.passingInverse)
      return this.getValue() <= appGlobals.passingGrade;
    return this.getValue() >= appGlobals.passingGrade;
  }

  static doesGradePass(grade: number): boolean {
    if (appGlobals.passingInverse) return grade <= appGlobals.passingGrade;
    return grade >= appGlobals.passingGrade;
  }

  doesGradeFail(): boolean {
    if (appGlobals.passingInverse)
      return this.getValue() > appGlobals.passingGrade;
    return this.getValue() < appGlobals.passingGrade;
  }

  static doesGradeFail(grade: number): boolean {
    if (appGlobals.passingInverse) return grade > appGlobals.passingGrade;
    return grade < appGlobals.passingGrade;
  }

  doesGradeFailOrEqual(): boolean {
    if (appGlobals.passingInverse)
      return this.getValue() >= appGlobals.passingGrade;
    return this.getValue() <= appGlobals.passingGrade;
  }

  static doesGradeFailOrEqual(grade: number): boolean {
    if (appGlobals.passingInverse) return grade >= appGlobals.passingGrade;
    return grade <= appGlobals.passingGrade;
  }
}
