import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./reducers/todosReducer";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({ todosReducer: todosReducer.reducer });
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
