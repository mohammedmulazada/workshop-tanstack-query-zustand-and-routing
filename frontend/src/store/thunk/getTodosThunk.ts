import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTodos } from "../../services/TodoServices";

export const getTodosThunk = createAsyncThunk("getTodos", async () => {
  const data = await getAllTodos();

  return data;
});
