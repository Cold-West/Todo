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
  color: string;
};
export const checkIfBoard = (
  input: TaskType | BoardType,
): input is TaskType => {
  return Object.prototype.hasOwnProperty.call(input, "boardID");
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
