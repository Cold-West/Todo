import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer, taskListReducer } from "../redux";
export const store = configureStore({
  reducer: {
    Tasks: taskListReducer,
    Boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
