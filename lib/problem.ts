import { toastProblem } from "@/lib/toasts";
import { Empty } from "@/types/types";

export type Problem = {
  errorMessage?: string | Empty;
  statusCode?: number | string | Empty;
  errorCode?: ErrorCode | number | string | Empty;
  solution?: string | Empty;
  detail?: string | Empty;
  finalMessage?: string | Empty;
  e?: any;
};

enum ErrorCode {
  UniqueConstraintViolation = "23505",
  UnuauthorizedViolation = "GC401",
}

const errorMessages: { [key in ErrorCode]?: string } = {
  [ErrorCode.UniqueConstraintViolation]: "You already added this subject",
  [ErrorCode.UnuauthorizedViolation]: "You are not logged in",
};

export function getProblem(problem: Problem): Problem {
  const finalMessage = errorMessages[problem.errorCode as ErrorCode];
  problem = { ...problem, finalMessage };
  return problem;
}

export function catchProblem(thingInQuestion: any) {
  if (
    thingInQuestion.errorMessage ||
    thingInQuestion.statusCode ||
    thingInQuestion.errorCode ||
    thingInQuestion.solution ||
    thingInQuestion.detail ||
    thingInQuestion.finalMessage ||
    thingInQuestion.e
  ) {
    toastProblem(thingInQuestion);
  } else return thingInQuestion;
}
