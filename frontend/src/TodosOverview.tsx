import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Todo } from "../../types/Todo";

const filterCompletedTodos = (todo: Todo) => {
  return todo.completed;
};

const filterUncompletedTodos = (todo: Todo) => {
  return !todo.completed;
};

export const TodosOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [uncompletedTodos, setUncompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetch("http://localhost:3000/todos");

      const res: Todo[] = await data.json();
      setCompletedTodos(res.filter(filterCompletedTodos));
      setUncompletedTodos(res.filter(filterUncompletedTodos));
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  if (isLoading) {
    return <p>hang on... loading all todos...</p>;
  }

  return (
    <div>
      <div>
        <h1>Completed todos</h1>
        {completedTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}> {todo.text}</Link>
            </li>
          );
        })}
      </div>
      <div>
        <h1>Uncompleted todos</h1>
        {uncompletedTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <Link to={`/todos/${todo.id}`}> {todo.text}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};
