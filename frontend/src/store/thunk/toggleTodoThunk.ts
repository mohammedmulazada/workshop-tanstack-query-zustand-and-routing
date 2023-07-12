import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleToggleTodo } from "../../services/TodoServices";

export const toggleTodoThunk = createAsyncThunk(
  "toggleTodoThunk",
  async (todoId: string | number) => {
    const response = await handleToggleTodo(todoId);

    return response;
  }
);
