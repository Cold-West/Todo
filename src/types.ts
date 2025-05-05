export type TaskType = {
  title: string;
  text: string;
  id: string;
  check: boolean;
  date: Date | null;
};
export type TaskMap = {
  [taskId: string]: TaskType;
}

export type BoardType = {
  title: string;
  taskIds: string[];
  id: string;
}

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