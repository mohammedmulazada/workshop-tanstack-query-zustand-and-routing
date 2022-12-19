import { Todo } from "../../../types/Todo";

export const getAllTodos = async () => {
  const data = await fetch("http://localhost:3333/todos");

  const res: Todo[] = await data.json();

  return res;
};

export const getTodoById = async (todoId: string | number) => {
  const data = await fetch(`http://localhost:3333/todos/${todoId}`);

  const res: Todo = await data.json();

  return res;
};

export const handleToggleTodo = async (todoId: string | number) => {
  const data = await fetch(`http://localhost:3333/todos/${todoId}`, {
    method: "PATCH",
  });

  const response: Todo = await data.json();

  return response;
};

export const handleAddTodo = async (text: string | FormDataEntryValue) => {
  const data = await fetch("http://localhost:3333/todos", {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await data.json();

  return response as Todo;
};
