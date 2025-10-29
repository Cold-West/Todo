export type TaskType = {
  title: string;
  text: string;
  check: boolean;
  date: Date | null;
  boardID: string;
};

export type IdTaskType = {
  task: TaskType;
  id: string
}

export type BoardType = {
  title: string;
  color: string;
};

export type IdBoardType = {
  board: BoardType;
  id: string;
}

export enum InputType {
  input = "input",
  textarea = "textarea",
}
