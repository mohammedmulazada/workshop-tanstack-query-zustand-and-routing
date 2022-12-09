import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Todo } from "../../types/Todo";

export const TodosOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetch("http://localhost:3000/todos");

      const res: Todo[] = await data.json();
      setTodos(res);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <p>hang on... loading all todos...</p>;
  }

  return (
    <div>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}> {todo.text}</Link>
          </li>
        );
      })}
    </div>
  );
};
