import { TaskType } from "./types";

export const todoListDefault: TaskType[] = [
  { title: "1", text: "aaaa", id: 1, check: true, date: new Date() },
  { title: "2", text: "bbbb", id: 2, check: true, date: new Date() },
  { title: "3", text: "cccc", id: 3, check: true, date: new Date() },
  { title: "4", text: "aaaa", id: 4, check: false, date: new Date() },
  { title: "5", text: "bbbb", id: 5, check: false, date: new Date() },
  { title: "6", text: "cccc", id: 6, check: false, date: new Date() },
];

export const testTasks: TaskType[] = [
  { title: "7", text: "qwe", id: 7, check: true, date: new Date() },
  { title: "8", text: "asd", id: 8, check: true, date: new Date() },
  { title: "9", text: "zxc", id: 9, check: true, date: new Date() },
];