import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const data = await fetch(`http://localhost:3000/todos/${id}`, {
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
        console.log(prevData, data);
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
