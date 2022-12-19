import { useNavigate, useParams } from "react-router-dom";
import { useTodoToggleMutation, useTodoQuery } from "./hooks/useTodo";

export const TodosDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { todoId } = params;

  const id = todoId;

  if (typeof id === "undefined") {
    navigate("/");
  }

  const { data, isLoading } = useTodoQuery({
    id: todoId!,
  });

  const { mutate } = useTodoToggleMutation(todoId!);

  if (!todoId || todoId === undefined) {
    navigate("/");
  }

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      {data && (
        <div className="flex flex-col">
          <span>Title: {data.text}</span>
          <br />
          <span>Status: {data.completed ? "completed" : "not completed"}</span>
        </div>
      )}
      {todoId && (
        <button type="button" onClick={() => mutate()}>
          Toggle todo
        </button>
      )}
    </div>
  );
};
