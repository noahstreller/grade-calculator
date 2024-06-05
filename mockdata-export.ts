import { GradeWithSubject } from "@/db/schema";
import { AverageWithSubject } from "@/types/types";

export const MOCKDATA: {
  data: GradeWithSubject[];
  averageData: AverageWithSubject[];
  failingData: (data: AverageWithSubject[]) => AverageWithSubject[];
  passingData: (data: AverageWithSubject[]) => AverageWithSubject[];
} = {
  data: [
    {
      grades: {
        id: 134,
        value: 5.4,
        subject_fk: 83,
        description: "Banking",
        weight: 1,
        date: new Date("2024-05-02T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 83,
        name: "Economy",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 136,
        value: 3.2,
        subject_fk: 79,
        description: "Kinematics",
        weight: 1,
        date: new Date("2024-05-03T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 79,
        name: "Physics",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 130,
        value: 4.6,
        subject_fk: 81,
        description: "Vectorgeometry",
        weight: 1,
        date: new Date("2024-05-04T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 81,
        name: "Maths",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 132,
        value: 4.75,
        subject_fk: 82,
        description: "Running circles for 30 minutes",
        weight: 1,
        date: new Date("2024-05-10T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 82,
        name: "PE",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 138,
        value: 6,
        subject_fk: 83,
        description: "Surprise exam",
        weight: 1,
        date: new Date("2024-05-15T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 83,
        name: "Economy",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 135,
        value: 3.7,
        subject_fk: 80,
        description: "Human anatomy",
        weight: 1,
        date: new Date("2024-05-15T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 80,
        name: "Biology",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 133,
        value: 3.82,
        subject_fk: 81,
        description: "Addition and subtraction",
        weight: 1,
        date: new Date("2024-05-16T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 81,
        name: "Maths",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 139,
        value: 5.2,
        subject_fk: 80,
        description: "Micro-organism",
        weight: 1,
        date: new Date("2024-05-17T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 80,
        name: "Biology",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 140,
        value: 4.4,
        subject_fk: 79,
        description: "Heat",
        weight: 1,
        date: new Date("2024-05-18T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 79,
        name: "Physics",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 137,
        value: 2,
        subject_fk: 82,
        description: "Endurance",
        weight: 1,
        date: new Date("2024-05-21T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 82,
        name: "PE",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      grades: {
        id: 131,
        value: 3,
        subject_fk: 82,
        description: "More endurance",
        weight: 0.5,
        date: new Date("2024-05-30T22:00:00.000Z"),
        category_fk: 0,
        userId: "0",
      },
      subjects: {
        id: 82,
        name: "PE",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
  ],
  averageData: [
    {
      average: {
        subjectId: 79,
        gradeAverage: 3.8000000000000003,
        gradeSum: 7.6000000000000005,
        gradeWeightedSum: 7.6000000000000005,
        gradeWeightedAmount: 2,
        gradeAmount: 2,
        passing: false,
      },
      subject: {
        id: 79,
        name: "Physics",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      average: {
        subjectId: 81,
        gradeAverage: 4.21,
        gradeSum: 8.42,
        gradeWeightedSum: 8.42,
        gradeWeightedAmount: 2,
        gradeAmount: 2,
        passing: true,
      },
      subject: {
        id: 81,
        name: "Maths",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      average: {
        subjectId: 80,
        gradeAverage: 4.45,
        gradeSum: 8.9,
        gradeWeightedSum: 8.9,
        gradeWeightedAmount: 2,
        gradeAmount: 2,
        passing: true,
      },
      subject: {
        id: 80,
        name: "Biology",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      average: {
        subjectId: 82,
        gradeAverage: 3.3,
        gradeSum: 9.75,
        gradeWeightedSum: 8.25,
        gradeWeightedAmount: 2.5,
        gradeAmount: 3,
        passing: false,
      },
      subject: {
        id: 82,
        name: "PE",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
    {
      average: {
        subjectId: 83,
        gradeAverage: 5.7,
        gradeSum: 11.4,
        gradeWeightedSum: 11.4,
        gradeWeightedAmount: 2,
        gradeAmount: 2,
        passing: true,
      },
      subject: {
        id: 83,
        name: "Economy",
        weight: 1,
        category_fk: 0,
        userId: "0",
      },
    },
  ],
  failingData: (data: AverageWithSubject[]) =>
    data.filter(
      (average: AverageWithSubject) => average.average?.passing === false
    ),
  passingData: (data: AverageWithSubject[]) =>
    data.filter((average: AverageWithSubject) => average.average?.passing),
};

const exported = {
  preferences: {
    passingGrade: 4,
    minimumGrade: 1,
    maximumGrade: 6,
    gradeDecimals: 3,
    newEntitySheetShouldStayOpen: false,
    passingInverse: false,
  },
  grades: [
    {
      grades: {
        value: 3.2,
        weight: 1,
        date: "2024-05-03T22:00:00.000Z",
        description: "Kinematics",
      },
      subjects: { name: "Physics" },
    },
    {
      grades: {
        value: 3.7,
        weight: 1,
        date: "2024-05-15T22:00:00.000Z",
        description: "Human anatomy",
      },
      subjects: { name: "Biology" },
    },
    {
      grades: {
        value: 3.82,
        weight: 1,
        date: "2024-05-16T22:00:00.000Z",
        description: "Addition and subtraction",
      },
      subjects: { name: "Maths" },
    },
    {
      grades: {
        value: 3,
        weight: 0.5,
        date: "2024-05-30T22:00:00.000Z",
        description: "More endurance",
      },
      subjects: { name: "PE" },
    },
    {
      grades: {
        value: 4.6,
        weight: 1,
        date: "2024-05-04T22:00:00.000Z",
        description: "Vectorgeometry",
      },
      subjects: { name: "Maths" },
    },
    {
      grades: {
        value: 5.4,
        weight: 1,
        date: "2024-05-02T22:00:00.000Z",
        description: "Banking",
      },
      subjects: { name: "Economy" },
    },
    {
      grades: {
        value: 4.75,
        weight: 1,
        date: "2024-05-10T22:00:00.000Z",
        description: "Running circles for 30 minutes",
      },
      subjects: { name: "PE" },
    },
    {
      grades: {
        value: 6,
        weight: 1,
        date: "2024-05-15T22:00:00.000Z",
        description: "Surprise exam",
      },
      subjects: { name: "Economy" },
    },
    {
      grades: {
        value: 5.2,
        weight: 1,
        date: "2024-05-17T22:00:00.000Z",
        description: "Micro-organism",
      },
      subjects: { name: "Biology" },
    },
    {
      grades: {
        value: 4.4,
        weight: 1,
        date: "2024-05-18T22:00:00.000Z",
        description: "Heat",
      },
      subjects: { name: "Physics" },
    },
    {
      grades: {
        value: 2,
        weight: 1,
        date: "2024-05-21T22:00:00.000Z",
        description: "Endurance",
      },
      subjects: { name: "PE" },
    },
  ],
  subjects: [
    { name: "Maths" },
    { name: "Economy" },
    { name: "Physics" },
    { name: "PE" },
    { name: "Biology" },
  ],
  category: "My School",
};
