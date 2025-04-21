export type TaskType = {
  text: string;
  id: number;
  check: boolean;
};

export enum FilterType {
    ALL = 'All',
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
};