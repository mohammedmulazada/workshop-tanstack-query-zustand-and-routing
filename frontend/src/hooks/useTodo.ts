import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../../../types/Todo";
import {
  getAllTodos,
  getTodoById,
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
}: TodoQueryOptions<T> = {}) => {
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
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getTodoById(id),
    select,
  });
};

// create a mutation hook (useTodoToggleMutation) that toggles the status of a todo
// it should make use of the handleToggleTodo service
// It should accept a required parameter id

export const useTodoToggleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => handleToggleTodo(id),
    onSettled: (data) => {
      queryClient.setQueryData<Todo>(["todo", data?.id], () => {
        return data;
      });
      return queryClient.invalidateQueries(["todos"]);
    },
  });
};

// create a mutation hook (useTodoAddMutation) that toggles the status of a todo
// it should make use of the handleAddTodo service
// It should accept a required parameter text so that a todo can be created

export const useTodoAddMutation = () => {
  const queryClient = useQueryClient();
};
