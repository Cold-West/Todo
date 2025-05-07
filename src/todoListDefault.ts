import { TaskType } from "./types";

export const todoListDefault: TaskType[] = [
  { title: "1", text: "aaaa", id: 1, check: true, date: new Date(), boardID:"1"},
  { title: "2", text: "bbbb", id: 2, check: true, date: new Date(), boardID:"1" },
  { title: "3", text: "cccc", id: 3, check: true, date: new Date(), boardID:"1"},
  { title: "4", text: "aaaa", id: 4, check: false, date: new Date(), boardID:"1" },
  { title: "5", text: "bbbb", id: 5, check: false, date: new Date(), boardID:"2" },
  { title: "6", text: "cccc", id: 6, check: false, date: new Date(), boardID:"2" },
];

export const  boardsDefault =[
    { id: "1", title: "Сделать" },
    { id: "2", title: "Сделано" },
    { id: "3", title: "тест" },
  ]