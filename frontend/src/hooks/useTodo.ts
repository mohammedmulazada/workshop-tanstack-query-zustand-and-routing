import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Todo } from "../../../types/Todo";
import {
  getAllTodos,
  getTodoById,
  handleAddTodo,
  handleToggleTodo,
} from "../services/TodoServices";

// create a hook (useTodosQuery) that fetches all todos
// it should make use of the getAllTodos service
// It should accept an optional parameter called select
// select is a function that returns data
// the typing is a bit tricky, to save time I created the variables with typings for you

type TodoQueryOptions<T> = {
  select?: (data: Todo[]) => T;
};

export const useTodosQuery = <T = Todo[]>({
  select,
}: { select?: (data: Todo[]) => T } = {}) => {
  return useQuery({ queryKey: ["todos"], queryFn: getAllTodos, select });
};

type SingleTodoQuerySelect<T> = {
  select?: (data: Todo) => T;
  id: string;
};

// create a hook (useTodoQuery) that fetches a specific todo by id
// it should make use of the getTodoById service
// It should accept an optional parameter called select
// It should accept a required parameter id

export const useTodoQuery = <T = Todo>({
  select,
  id,
}: SingleTodoQuerySelect<T>) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTodoById(id),
    select,
    initialData: () => {
      return queryClient
        .getQueryData<Todo[]>(["todos"])
        ?.find((todo) => todo.id.toString() === id.toString());
    },
  });
};

// create a mutation hook (useTodoToggleMutation) that toggles the status of a todo
// it should make use of the handleToggleTodo service
// It should accept a required parameter id

export const useTodoToggleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => handleToggleTodo(id),
    // onMutate: async (id) => {
    //   // Cancel any outgoing refetches
    //   // (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries(["todos"]);

    //   // Snapshot the previous value
    //   const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
    //   if (previousTodos?.length) {
    //     const copy = structuredClone(previousTodos);
    //     const index = copy.findIndex((todo) => todo.id === id.toString());
    //     copy[index].completed = !copy[index].completed;
    //     if (index !== -1) {
    //       // queryClient.setQueriesData<Todo[] | Todo>(["todos"], (prevTodos) => {
    //       //   if (Array.isArray(prevTodos) && prevTodos.length) {
    //       //     return copy;
    //       //   }

    //       //   return copy[index];
    //       // });
    //       queryClient.setQueryData(["todos"], copy);
    //       queryClient.setQueryData(["todos", id.toString()], copy[index]);
    //     }
    //   }

    //   // Return a context object with the snapshotted value
    //   return { previousTodos };
    // },
    // onError: (_, __, context) => {
    //   return queryClient.setQueryData(["todos"], context?.previousTodos);
    // },
    onSettled: async (lol) => {
      return queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

// create a mutation hook (useTodoAddMutation) that toggles the status of a todo
// it should make use of the handleAddTodo service
// It should accept a required parameter text so that a todo can be created

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => handleAddTodo(text),
    onMutate: async (data) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["todos"]);

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(["todos"], (old) => [
        ...(old || []),
        { completed: false, id: Math.random().toString(), text: data },
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      return queryClient.invalidateQueries(["todos"]);
    },
  });
};
