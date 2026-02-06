import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IdTaskType, TaskType } from "../../types";
import { StatusFilters, StatusSorters } from "../filters";
import { RootState } from "../../app/store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../firebase/firebase";

interface taskState {
  tasks: IdTaskType[];
}

const initialState: taskState = { tasks: [] };

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  const tasks = querySnapshot.docs.map((doc) => {
    const data = doc.data() as TaskType;
    return {
      task: data,
      id: doc.id,
    };
  });
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: TaskType) => {
    const addTaskRef = await addDoc(collection(db, "Tasks"), task);
    const newTask = { id: addTaskRef.id, task };
    return newTask;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const tasks = await getDocs(collection(db, "Tasks"));
    for (const task of tasks.docs) {
      if (task.id === id) {
        await deleteDoc(doc(db, "Tasks", task.id));
      }
    }
    return id;
  }
);

export const deleteTaskBoard = createAsyncThunk(
  "tasks/deleteTaskBoard",
  async (id: string) => {
    const tasks = await getDocs(
      query(collection(db, "Tasks"), where("boardID", "==", id))
    );
    for (const task of tasks.docs) {
      await deleteDoc(doc(db, "Tasks", task.id));
    }
    return id;
  }
);

export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (editedTask: IdTaskType) => {
    const tasks = await getDocs(collection(db, "Tasks"));
    for (const task of tasks.docs) {
      if (task.id === editedTask.id) {
        const TaskRef = doc(db, "Tasks", task.id);
        await updateDoc(TaskRef, editedTask.task);
      }
    }
    return editedTask;
  }
);

export const taskListSlice = createSlice({
  name: "Tasks",
  initialState,

  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const { id, task } = action.payload;
        const TaskIndex = state.tasks.findIndex((task) => task.id === id);
        if (TaskIndex !== -1) {
          state.tasks[TaskIndex] = { id: id, task };
        }
      })
      .addCase(deleteTaskBoard.fulfilled, (state, action)=>{
        state.tasks = state.tasks.filter((task)=> task.task.boardID !== action.payload)
      })
  },
});

export const taskListReducer = taskListSlice.reducer;

const selectTasks = (state: RootState) => state.Tasks.tasks;
const selectFilter = (state: RootState) => state.Filters.statusFilter;
const selectSorter = (state: RootState) => state.Filters.statusSorter;
const selectSearch = (state: RootState) => state.Filters.statusSearch;

export const visibleTasksSelector = createSelector(
  [selectTasks, selectFilter, selectSorter, selectSearch],
  (Tasks, currentFilter, currentSorter, currentSearch) => {
    const getFilteredTasks = () => {
      if (currentFilter === StatusFilters.Active) {
        return Tasks.filter((t: IdTaskType) => !t.task.check);
      }
      if (currentFilter === StatusFilters.Completed) {
        return Tasks.filter((t: IdTaskType) => t.task.check);
      }
      return Tasks;
    };

    const filteredTasks = getFilteredTasks();

    const getSortedTasks = () => {
      if (currentSorter === StatusSorters.aTOb) {
        return [...filteredTasks].sort((a: IdTaskType, b: IdTaskType) =>
          a.task.title.localeCompare(b.task.title)
        );
      }
      if (currentSorter === StatusSorters.bTOa) {
        return [...filteredTasks].sort((a: IdTaskType, b: IdTaskType) =>
          b.task.title.localeCompare(a.task.title)
        );
      }
      return filteredTasks;
    };

    const sortedTasks = getSortedTasks();

    const getSearchedTasks = () => {
      if (currentSearch) {
        return sortedTasks.filter(
          (task: IdTaskType) =>
            task.task.title.toLowerCase().includes(currentSearch) ||
            task.task.text.toLowerCase().includes(currentSearch)
        );
      }

      return sortedTasks;
    };

    return getSearchedTasks();
  }
);
