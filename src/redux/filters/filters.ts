import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const StatusFilters = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

export const StatusSorters = {
  OFF: "OFF",
  aTOb: "aTOb",
  bTOa: "bTOa",
  date: "date",
}
const initialState = {
  statusFilter: StatusFilters.All,
  statusSorter: StatusSorters.OFF
};

export const filterSlice = createSlice({
  name: "Filters",
  initialState,

  reducers: {
    statusFilterChanged: (state, action: PayloadAction<string>)=>{
      state.statusFilter = action.payload;
    },
    statusSorterChanged: (state, action: PayloadAction<string>)=>{
      state.statusSorter = action.payload;
    }
  },
});

export const { statusFilterChanged, statusSorterChanged } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
