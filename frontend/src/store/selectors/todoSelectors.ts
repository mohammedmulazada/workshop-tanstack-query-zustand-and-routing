import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../createStore";

export const selectAllTodos = (state: RootState) => state.todosReducer.todos;
export const selectAllCompletedTodos = createSelector(
  [selectAllTodos],
  (todos) => {
    return todos.filter((todo) => todo.completed);
  }
);
export const selectAllUncompletedTodos = createSelector(
  [selectAllTodos],
  (todos) => {
    return todos.filter((todo) => !todo.completed);
  }
);
export const selectTodoLoadingState = (state: RootState) =>
  state.todosReducer.isLoading;
