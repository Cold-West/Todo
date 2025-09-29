import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boardsDefault } from "../../todoListDefault";
import { BoardType } from "../../types";

const initialState = { value: boardsDefault };

export const boardsSlice = createSlice({
  name: "Boards",
  initialState,

  reducers: {
    BoardCreate: (state, action: PayloadAction<BoardType>) => {
      action.payload.id = String(Date.now());
      state.value.push(action.payload);
    },
    BoardEdit: (state, action: PayloadAction<BoardType>) => {
      const oldBoardIndex = state.value.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (oldBoardIndex !== -1) {
        state.value[oldBoardIndex] = action.payload;
      }
    },
    BoardRemove: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((board) => board.id !== action.payload);
    },
  },
});

export const { BoardCreate, BoardEdit, BoardRemove } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
