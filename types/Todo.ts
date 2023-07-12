export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type AddTodo = Omit<Todo, "id" | "completed">;
