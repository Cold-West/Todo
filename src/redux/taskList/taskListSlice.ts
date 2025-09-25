import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todoListDefault } from "../../todoListDefault";
import { TaskType } from "../../types";

const initialState = { value: todoListDefault };

type DateChange = Pick<TaskType, "id" | "date">;

export const taskListSlice = createSlice({
  name: "Tasks",
  initialState,

  reducers: {
    onTaskRemove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },
    onTaskCheck: (state, action: PayloadAction<number>) => {
      const task = state.value.find((task) => task.id === action.payload);
      if (task) {
        task.check = !task.check;
      }
    },
    onTaskDateChange: {
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
    onTaskCreate: (state, action: PayloadAction<TaskType>) => {
      action.payload.id = Date.now();
      state.value.push(action.payload);
    },
    onTaskEdit: (state, action: PayloadAction<TaskType>) => {
      const oldTask = state.value.find((task) => task.id === action.payload.id);
      if (oldTask) {
        oldTask.boardID = action.payload.boardID;
        oldTask.check = action.payload.check;
        oldTask.date = action.payload.date;
        oldTask.id = action.payload.id;
        oldTask.text = action.payload.text;
        oldTask.title = action.payload.title;
      }
    },
  },
});

export const {
  onTaskRemove,
  onTaskCheck,
  onTaskDateChange,
  onTaskCreate,
  onTaskEdit,
} = taskListSlice.actions;

export default taskListSlice.reducer;
