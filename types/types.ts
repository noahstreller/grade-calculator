export type Empty = undefined | null;
export type Average = {
  subjectId: number,
  gradeAverage: number,
  gradeAmount: number,
  passing: ()=>boolean,
}