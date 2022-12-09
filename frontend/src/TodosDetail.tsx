import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../../types/Todo";

export const TodosDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const { todoId } = params;
  const [todo, setTodo] = useState<Todo>();

  if (!todoId || todoId === undefined) {
    navigate("/");
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await fetch(`http://localhost:3000/todos/${todoId}`);

      const res: Todo = await data.json();
      setTodo(res);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const handleToggleTodo = async (id: string) => {
    setIsLoading(true);
    const data = await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PATCH",
    });

    const response = await data.json();

    setTodo(response);
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      {todo && (
        <div>
          <span>{todo.text}</span>
          <br />
          <span>
            This todo is {todo.completed ? "completed" : "not completed"}
          </span>
        </div>
      )}
      {todoId && (
        <button onClick={() => handleToggleTodo(todoId)}>Toggle todo</button>
      )}
    </div>
  );
};
