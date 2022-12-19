import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import create from "zustand";
import { Todo } from "../../../types/Todo";
import {
  getAllTodos,
  getTodoById,
  handleAddTodo,
} from "../services/TodoServices";

export const useTodosQuery = <T = Todo[]>({
  select,
}: {
  select?: (data: Todo[]) => T;
}) =>
  useQuery(["todos"], getAllTodos, {
    initialData: [],
    select,
  });

export const useTodoQuery = <T = Todo>({
  select,
  id,
}: {
  select?: (data: Todo) => T;
  id: number | string;
}) =>
  useQuery(["todo", id], () => getTodoById(id), {
    select,
  });

const handleToggleTodo = async (id: string | number) => {
  const data = await fetch(`http://localhost:3333/todos/${id}`, {
    method: "PATCH",
  });

  const response = await data.json();

  return response as Todo;
};

export const useTodoToggleMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => handleToggleTodo(id),
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Todo[]>(["todos"], (prevData) => {
        if (!prevData?.length) {
          return;
        }
        const updatedTodos = prevData.map((todo) => {
          if (todo.id === data.id) {
            return { ...todo, completed: data.completed };
          }

          return todo;
        });

        return updatedTodos;
      });

      queryClient.setQueryData<Todo>(["todo", data.id], (prevData) => {
        if (!prevData) {
          return;
        }

        return { ...prevData, ...data };
      });
    },
  });
};

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (text: string | FormDataEntryValue) => handleAddTodo(text),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<Todo[]>(["todos"], (a) => {
          if (a?.length) {
            return [...a, data];
          }

          return [data];
        });
      },
    }
  );
};

type TodoState = {
  text: string;
  actions: {
    setText: (text: string) => void;
  };
};

const useTodoStore = create<TodoState>()((set) => ({
  text: "",
  actions: {
    setText: (text: string) => set({ text }),
  },
}));

export const useTodoText = () => useTodoStore((state) => state.text);
export const useTodoActions = () => useTodoStore((state) => state.actions);
