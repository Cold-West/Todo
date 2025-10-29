import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
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
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase/firebase";

interface taskState {
  tasks: IdTaskType[];
}

const initialState: taskState = { tasks: [] };

type DateChange = Pick<TaskType, "id" | "date">;
type DND = {
  endItem: TaskType;
  startItem: TaskType;
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const querySnapshot = await getDocs(collection(db, "Tasks"));
  const tasks = querySnapshot.docs.map((doc) => {
    const data = doc.data() as { boardId: string; checked: false, date: Timestamp };

    return {
      task: {
        ...data,
        date: data.date.toMillis(),
      },
      id: doc.id,
    }
  });

  console.log({ tasks })
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: TaskType) => {
    const addTaskRef = await addDoc(collection(db, "Tasks"), task);
    const newTask = { id: addTaskRef.id, task};
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
    // TaskRemoveOnBoard: (state, action: PayloadAction<string>) => {
    //   state.value = state.value.filter(
    //     (task) => task.boardID !== action.payload
    //   );
    // },
    // TaskCheck: (state, action: PayloadAction<number>) => {
    //   const task = state.value.find((task) => task.id === action.payload);
    //   if (task) {
    //     task.check = !task.check;
    //   }
    // },
    // TaskDateChange: {
    //   reducer(state, action: PayloadAction<DateChange>) {
    //     const task = state.value.find((task) => task.id === action.payload.id);
    //     if (task) {
    //       task.date = action.payload.date;
    //     }
    //   },
    //   prepare(date: Date | null, id: number) {
    //     return {
    //       payload: { date, id },
    //     };
    //   },
    // },
    // TaskEdit: (state, action: PayloadAction<TaskType>) => {
    //   const oldTaskIndex = state.value.findIndex(
    //     (task) => task.id === action.payload.id
    //   );
    //   if (oldTaskIndex !== -1) {
    //     state.value[oldTaskIndex] = action.payload;
    //   }
    // },
    // DNDdropHandler: {
    //   reducer(state, action: PayloadAction<DND>) {
    //     const startItem = action.payload.startItem;
    //     const endItem = action.payload.endItem;
    //     const currentIndex = state.value.findIndex(
    //       (task) => task.id === startItem.id
    //     );
    //     const dropIndex = state.value.findIndex(
    //       (task) => task.id === endItem.id
    //     );
    //     state.value.splice(currentIndex, 1);
    //     state.value.splice(dropIndex, 0, startItem);
    //   },
    //   prepare(startItem: TaskType, endItem: TaskType) {
    //     return {
    //       payload: { startItem, endItem },
    //     };
    //   },
    // },
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
      .addCase(editTask.fulfilled, (state,action)=>{
        const { id, task } = action.payload;
        const TaskIndex = state.tasks.findIndex((task)=> task.id === id);
        if (TaskIndex !== -1){
          state.tasks[TaskIndex] = {id: id, task};
        }
      });
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

// const selectTasks = (state: RootState) => state.Tasks.tasks;
// const selectFilter = (state: RootState) => state.Filters.statusFilter;
// const selectSorter = (state: RootState) => state.Filters.statusSorter;
// const selectSearch = (state: RootState) => state.Filters.statusSearch;

// export const visibleTasksSelector = createSelector(
//   [selectTasks, selectFilter, selectSorter, selectSearch],
//   (Tasks, currentFilter, currentSorter, currentSearch) => {
//     const getFilteredTasks = () => {

//       if (currentFilter === StatusFilters.Active) {
//         return Tasks.filter((t: TaskType) => !t.check);
//       }
//       if (currentFilter === StatusFilters.Completed) {
//         return Tasks.filter((t: TaskType) => t.check);
//       }
//       return Tasks;
//     };

//     const filteredTasks = getFilteredTasks();

//     const getSortedTasks = () => {
//       if (currentSorter === StatusSorters.aTOb) {
//         return [...filteredTasks].sort((a: TaskType, b: TaskType) =>
//           a.title.localeCompare(b.title)
//         );
//       }
//       if (currentSorter === StatusSorters.bTOa) {
//         return [...filteredTasks].sort((a: TaskType, b: TaskType) =>
//           b.title.localeCompare(a.title)
//         );
//       }
//       return filteredTasks;
//     };

//     const sortedTasks = getSortedTasks();

//     const getSearchedTasks = () => {
//       if (currentSearch) {
//         return sortedTasks.filter(
//           (task: TaskType) =>
//             task.title.toLowerCase().includes(currentSearch) ||
//             task.text.toLowerCase().includes(currentSearch)
//         );
//       }

//       return sortedTasks;
//     };

//     return getSearchedTasks();
//   }
// );
