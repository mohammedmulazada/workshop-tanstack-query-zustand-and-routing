import { useNavigate, useParams } from "react-router-dom";
import { useTodoQuery, useTodoToggleMutation } from "./hooks/useTodo";

export const TodosDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { todoId } = params;

  if (!todoId || todoId === undefined) {
    navigate("/");
  }
  const { data: todo, isLoading } = useTodoQuery(todoId as string);
  const { mutate, isLoading: isMutating } = useTodoToggleMutation();

  const toggleTodo = async (id: string) => {
    mutate(todoId as string);
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
          {isMutating ? "Mutating" : "Toggle todo"}
        </button>
      )}
    </div>
  );
};
