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
    return (
      <div className="w-full mx-auto">
        <p className="text-center">...Loading</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {todo && (
        <div className="flex flex-col items-center p-6 rounded text-center">
          <span className="text-lg font-bold mb-2">Title: {todo.text}</span>
          <span className="text-md mb-4">
            Status: {todo.completed ? "completed" : "not completed"}
          </span>
        </div>
      )}
      {todoId && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => toggleTodo(todoId)}
        >
          Toggle todo
        </button>
      )}
    </div>
  );
};
