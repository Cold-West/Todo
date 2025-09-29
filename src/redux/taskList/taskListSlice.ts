import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoListDefault } from "../../todoListDefault";
import { TaskType } from "../../types";

const initialState = { value: todoListDefault };

type DateChange = Pick<TaskType, "id" | "date">;
type DND = {
  endItem: TaskType;
  startItem: TaskType;
};

export const taskListSlice = createSlice({
  name: "Tasks",
  initialState,

  reducers: {
    TaskRemove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
    TaskRemoveOnBoard: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (task) => task.boardID !== action.payload,
      );
    },
    TaskCheck: (state, action: PayloadAction<number>) => {
      const task = state.value.find((task) => task.id === action.payload);
      if (task) {
        task.check = !task.check;
      }
    },
    TaskDateChange: {
      reducer(state, action: PayloadAction<DateChange>) {
        const task = state.value.find((task) => task.id === action.payload.id);
        if (task) {
          task.date = action.payload.date;
        }
      },
      prepare(date: Date | null, id: number) {
        return {
          payload: { date, id },
        };
      },
    },
    TaskCreate: (state, action: PayloadAction<TaskType>) => {
      action.payload.id = Date.now();
      state.value.push(action.payload);
    },
    TaskEdit: (state, action: PayloadAction<TaskType>) => {
      const oldTaskIndex = state.value.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (oldTaskIndex !== -1) {
        state.value[oldTaskIndex] = action.payload;
      }
    },
    DNDdropHandler: {
      reducer(state, action: PayloadAction<DND>) {
        const startItem = action.payload.startItem;
        const endItem = action.payload.endItem;
        const currentIndex = state.value.findIndex(
          (task) => task.id === startItem.id,
        );
        const dropIndex = state.value.findIndex(
          (task) => task.id === endItem.id,
        );
        state.value.splice(currentIndex, 1);
        state.value.splice(dropIndex, 0, startItem);
      },
      prepare(startItem: TaskType, endItem: TaskType) {
        return {
          payload: { startItem, endItem },
        };
      },
    },
  },
});

export const {
  TaskRemove,
  TaskCheck,
  TaskDateChange,
  TaskCreate,
  TaskEdit,
  DNDdropHandler,
  TaskRemoveOnBoard,
} = taskListSlice.actions;

export const taskListReducer = taskListSlice.reducer;
