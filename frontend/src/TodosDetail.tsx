import { useNavigate, useParams } from "react-router-dom";
import { useTodoMutation, useTodoQuery } from "./hooks/useTodo";

export const TodosDetail = () => {
  const params = useParams();
  const { todoId } = params;

  const { data, isLoading } = useTodoQuery({
    id: todoId!,
  });

  const { mutate } = useTodoMutation(todoId!);

  const navigate = useNavigate();

  if (!todoId || todoId === undefined) {
    navigate("/");
  }

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <div>
      {data && (
        <div>
          <span>{data.text}</span>
          <br />
          <span>
            This todo is {data.completed ? "completed" : "not completed"}
          </span>
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
