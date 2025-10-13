import { configureStore } from "@reduxjs/toolkit";
import { boardsReducer, filterReducer, taskListReducer } from "../redux";
export const store = configureStore({
  reducer: {
    Tasks: taskListReducer,
    Boards: boardsReducer,
    Filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
