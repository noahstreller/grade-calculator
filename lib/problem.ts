"use server"
import { Empty } from "@/types/types";

export type Problem = {
  message?: string | Empty,
  statusCode?: number | string | Empty,
  errorCode?: ErrorCode | number | string | Empty,
  solution?: string | Empty,
  detail?: string | Empty,
  finalMessage?: string | Empty
}

enum ErrorCode {
  UniqueConstraintViolation = "23505",
}

const errorMessages: { [key in ErrorCode]?: string } = {
  [ErrorCode.UniqueConstraintViolation]: "You already added this subject",
};

export function getProblem(problem: Problem): Problem {
  const finalMessage = errorMessages[problem.errorCode as ErrorCode];
  if (finalMessage) {
    return { ...problem, finalMessage };
  }
  return problem;
}