import { Link } from "react-router-dom";
import { TodoContainer } from "./TodoContainer";
import Skeleton from "react-loading-skeleton";
import { useTodoToggleMutation, useTodosQuery } from "../hooks/useTodo";

const classes =
  "f-hull flex flex-col py-8 px-8 my-4 bg-gray-300 text-black rounded-xl shadow-lg space-y-4";

export const UncompletedTodos = () => {
  const { data: uncompletedTodos, isLoading } = useTodosQuery({
    select: (data) => data.filter((todo) => !todo.completed),
  });
  const { mutate, variables, isLoading: isMutating } = useTodoToggleMutation();

  const title = "Uncompleted todo's";

  if (isLoading || !uncompletedTodos || !uncompletedTodos.length) {
    return (
      <TodoContainer title={<Skeleton />}>
        {Array.from({ length: 12 }).map((_, i) => {
          return (
            <li
              key={i}
              className="h-full flex flex-col py-8 px-8 my-4 bg-white text-black rounded-xl shadow-lg space-y-4"
            >
              <h2 className="text-lg font-semibold">
                <Skeleton />
              </h2>
              <span className="">
                <Skeleton height={35} />
              </span>
              <span className="">
                <Skeleton height={35} />
              </span>
            </li>
          );
        })}
      </TodoContainer>
    );
  }

  return (
    <TodoContainer title={title}>
      {uncompletedTodos.map((todo) => {
        return (
          <li key={todo.id} className={classes}>
            <h2 className="text-lg font-semibold">{todo.text}</h2>
            <button
              className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 text-center"
              onClick={() => mutate(todo.id as string)}
            >
              {isMutating && todo.id.toString() === variables?.toString()
                ? "Loading"
                : "Toggle to do"}
            </button>
            <Link
              className="p-2 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 text-center"
              key={todo.id}
              to={`/todos/${todo.id}`}
            >
              Edit
            </Link>
          </li>
        );
      })}
    </TodoContainer>
  );
};
