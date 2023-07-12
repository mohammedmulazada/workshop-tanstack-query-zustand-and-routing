import { useEffect } from "react";
import { useAppDispatch } from "./store/createStore";
import { getTodosThunk } from "./store/thunk/getTodosThunk";
import { CompletedTodos } from "./components/CompletedTodos";
import { UncompletedTodos } from "./components/UncompletedTodos";

export const TodosOverview = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      await dispatch(getTodosThunk());
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <CompletedTodos />
      <UncompletedTodos />
    </div>
  );
};
