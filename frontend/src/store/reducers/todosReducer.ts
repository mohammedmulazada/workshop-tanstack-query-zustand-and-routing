import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../../../types/Todo";
import { getTodosThunk } from "../thunk/getTodosThunk";
import { toggleTodoThunk } from "../thunk/toggleTodoThunk";

type InitialStateType = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: InitialStateType = {
  todos: [],
  isLoading: false,
};

export const todosReducer = createSlice({
  name: "todosReducer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTodosThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTodosThunk.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.isLoading = false;
          state.todos = action.payload;
        }
      )
      .addCase(getTodosThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleTodoThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        toggleTodoThunk.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index] = action.payload;
          }
          state.isLoading = false;
        }
      )
      .addCase(toggleTodoThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
