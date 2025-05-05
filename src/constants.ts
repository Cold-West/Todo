import { BoardType, TaskMap } from "./types";

export const TASKS_INIT: TaskMap = {
  "1": {
    title: "1",
    text: "aaaa",
    id: "1",
    check: true,
    date: new Date(),
  },
  "2": {
    title: "2",
    text: "bbbb",
    id: "2",
    check: true,
    date: new Date(),
  },
  "3": {
    title: "3",
    text: "cccc",
    id: "3",
    check: true,
    date: new Date(),
  },
  "4": {
    title: "4",
    text: "dddd",
    id: "4",
    check: true,
    date: new Date(),
  },
  "5": {
    title: "5",
    text: "eeee",
    id: "5",
    check: true,
    date: new Date(),
  },
};

export const BOARDS_INIT: BoardType[] = [
  { id: "1", title: "Сделать", taskIds: ['1', '2', '3', '4'] },
  { id: "2", title: "Сделано", taskIds: ['5'] },
];
