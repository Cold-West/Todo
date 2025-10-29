import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardType, IdBoardType } from "../../types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase/firebase";

interface boardState {
  boards: IdBoardType[];
  currentBoard: string;
}

const initialState: boardState = { boards: [], currentBoard: "1" };

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const querySnapshot = await getDocs(collection(db, "Boards"));
  const boards = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    board: doc.data(),
  }));
  return boards;
});

export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (board: BoardType) => {
    const addBoardRef = await addDoc(collection(db, "Boards"), board);
    const newBoard = { id: addBoardRef.id, board };
    return newBoard;
  }
);

export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id: string) => {
    const boards = await getDocs(collection(db, "Boards"));
    for (const board of boards.docs) {
      if (board.id === id) {
        await deleteDoc(doc(db, "Boards", board.id));
      }
    }
    return id;
  }
);

export const editBoard = createAsyncThunk(
  "boards/editBoard",
  async (editedBoard: IdBoardType) => {
    const boards = await getDocs(collection(db, "Boards"));
    for (const board of boards.docs) {
      if (board.id === editedBoard.id) {
        const BoardRef = doc(db, "Boards", board.id);
        await updateDoc(BoardRef, editedBoard.board);
      }
    }
    return editedBoard;
  }
);

export const boardsSlice = createSlice({
  name: "Boards",
  initialState,

  reducers: {
    BoardListChange: (state, action: PayloadAction<string>) => {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        const { id, board } = action.payload;
        const BoardIndex = state.boards.findIndex((board) => board.id === id);
        if (BoardIndex !== -1) {
          state.boards[BoardIndex] = { id: id, board };
        }
      });
  },
});

export const { BoardListChange } = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
