import {
  Updater,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Todo } from "../../../types/Todo";

const fetchTodos = async () => {
  const data = await fetch("http://localhost:3000/todos");

  const res = await data.json();

  return res as Todo[];
};

const fetchTodo = async (id: number | string) => {
  const data = await fetch(`http://localhost:3000/todos/${id}`);

  const res = await data.json();

  return res as Todo;
};

export const useTodosQuery = <T = Todo[]>({
  select,
}: {
  select?: (data: Todo[]) => T;
}) =>
  useQuery(["todos"], fetchTodos, {
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
  useQuery(["todo", id], () => fetchTodo(id), {
    select,
  });

const handleToggleTodo = async (id: string | number) => {
  const data = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PATCH",
  });

  const response = await data.json();

  return response as Todo;
};

export const useTodoMutation = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => handleToggleTodo(id),
    onSuccess: (data, variables) => {
      console.log(data, variables);
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
