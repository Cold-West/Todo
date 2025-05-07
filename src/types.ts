export type TaskType = {
  title: string;
  text: string;
  id: number;
  check: boolean;
  date: Date | null;
  boardID: string;
};
export type BoardType = {
  title: string;
  id: string;
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
}