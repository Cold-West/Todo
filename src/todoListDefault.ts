import { BoardType, TaskType } from "./types";

export const INITIAL_MODALTASK_STATE: TaskType = {
  boardID: "",
  title: "",
  text: "",
  check: false,
  // date: new Date().getTime(),
  date: null,
};
export const INITIAL_MODALBOARD_STATE: BoardType = {
  title: "",
  color: "#2089AC",
};
export const boardColors: BoardType[] = [
  { color: "#2089AC", title: "Голубой" },
  { color: "#104456", title: "Синий" },
  { color: "#B5B577", title: "Желтый" },
  { color: "#89AC7F", title: "Зеленый" },
  { color: "#D85B5D", title: "Красный" },
  { color: "#977846", title: "Коричневый" },
];
