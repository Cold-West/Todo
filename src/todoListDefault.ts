import { TaskType } from "./types";

export const todoListDefault: TaskType[] = [
  { text: "aaaa", id: 1, check: true, date: new Date() },
  { text: "bbbb", id: 2, check: true, date: new Date() },
  { text: "cccc", id: 3, check: true, date: new Date() },
  { text: "aaaa", id: 4, check: false, date: new Date() },
  { text: "bbbb", id: 5, check: false, date: new Date() },
  { text: "cccc", id: 6, check: false, date: new Date() },
];
