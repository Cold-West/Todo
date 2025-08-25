export type TaskType = {
  title: string;
  text: string;
  id: number;
  check: boolean;
  date: Date | null;
  boardID: string;
};

export type BoardColorsType = {
  color: string;
  title: string;
};

export type BoardType = {
  title: string;
  id: string;
  color: string;
};

export enum FilterType {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export enum SorterType {
  OFF = "OFF",
  aTOb = "aTOb",
  bTOa = "bTOa",
  date = "date",
}

export enum InputType {
  input = "input",
  textarea = "textarea",
}
