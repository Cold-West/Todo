import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../redux/taskList/taskListSlice"
export const store = configureStore({
    reducer:{
        Tasks: taskReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store