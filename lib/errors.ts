import { exportToText } from "./storageUtils";

export class InvalidGradeError extends Error{
  static clearData() {
    exportToText();
    localStorage.removeItem("grades");
    localStorage.removeItem("subjects");
    window.location.href = window.location.pathname.replace(/\/+$/, '') + "?corrupted";
  }

  constructor() {
    super();
    InvalidGradeError.clearData();
  }
}

export class InvalidPreferenceError extends Error {
  constructor() {
    super("Invalid preferences");
    localStorage.removeItem("preferences");
    window.location.href = window.location.pathname.replace(/\/+$/, '') + "?corrupted";
  }
}