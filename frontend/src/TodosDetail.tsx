import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Todo } from "../../types/Todo";
import { getTodoById, handleToggleTodo } from "./services/TodoServices";

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
      if (!todoId) {
        return;
      }
      const res: Todo = await getTodoById(todoId);
      setTodo(res);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const toggleTodo = async (id: string) => {
    setIsLoading(true);

    const response = await handleToggleTodo(id);

    setTodo(response);
    setIsLoading(false);
  };

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      {todo && (
        <div className="flex flex-col">
          <span>Title: {todo.text}</span>
          <br />
          <span>Status: {todo.completed ? "completed" : "not completed"}</span>
        </div>
      )}
      {todoId && (
        <button onClick={() => toggleTodo(todoId)}>Toggle todo</button>
      )}
    </div>
  );
};
