import { Link } from "react-router-dom";
import { TodoContainer } from "./TodoContainer";
import Skeleton from "react-loading-skeleton";
import { useTodoToggleMutation, useTodosQuery } from "../hooks/useTodo";

const classes =
  "flex flex-col py-8 px-8 my-4 bg-emerald-700 text-black rounded-xl shadow-lg space-y-4 h-full";

export const CompletedTodos = () => {
  const { data: completedTodos, isLoading } = useTodosQuery({
    select: (data) => data.filter((todo) => todo.completed),
  });
  const { mutate } = useTodoToggleMutation();

  // const completedTodos = useSelector(selectAllCompletedTodos);
  // const isLoading = useSelector(selectTodoLoadingState);

  const title = "Completed todo's";

  if (isLoading) {
    return (
      <TodoContainer title={<Skeleton />}>
        {Array.from({ length: 2 }).map((_, i) => {
          return (
            <li
              key={i}
              className={`${classes} flex flex-col justify-between h-full pointer-events-none`}
            >
              <h2 className="text-lg font-semibold mb-auto">{<Skeleton />}</h2>
              <div className="flex flex-col space-y-2 mt-2">
                <span className="p-2 text-white rounded text-center">
                  <Skeleton />
                </span>
                <span className="p-2 text-white rounded text-center">
                  <Skeleton />
                </span>
              </div>
            </li>
          );
        })}
      </TodoContainer>
    );
  }

  return (
    <TodoContainer title={title}>
      {completedTodos?.map((todo) => {
        return (
          <li
            key={todo.id}
            className={`${classes} flex flex-col justify-between h-full`}
          >
            <h2 className="text-lg font-semibold mb-auto">{todo.text}</h2>
            <div className="flex flex-col space-y-2 mt-2">
              <button
                className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 text-center"
                onClick={() => mutate(todo.id)}
              >
                Toggle todo
              </button>
              <Link
                className="p-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 text-center"
                key={todo.id}
                to={`/todos/${todo.id}`}
              >
                Edit
              </Link>
            </div>
          </li>
        );
      })}
    </TodoContainer>
  );
};
