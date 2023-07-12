import { useSelector } from "react-redux";
import {
  selectAllCompletedTodos,
  selectTodoLoadingState,
} from "../store/selectors/todoSelectors";
import { useAppDispatch } from "../store/createStore";
import { toggleTodoThunk } from "../store/thunk/toggleTodoThunk";
import { Link } from "react-router-dom";
import { TodoContainer } from "./TodoContainer";
import Skeleton from "react-loading-skeleton";

export const CompletedTodos = () => {
  const completedTodos = useSelector(selectAllCompletedTodos);
  const isLoading = useSelector(selectTodoLoadingState);

  const dispatch = useAppDispatch();

  const title = "Completed todo's";

  if (isLoading || !completedTodos || !completedTodos.length) {
    return (
      <TodoContainer title={<Skeleton />}>
        {Array.from({ length: 2 }).map((item) => {
          return (
            <li
              key={item as number}
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

  const handleButtonClick = async (id: number | string) => {
    await dispatch(toggleTodoThunk(id));
  };

  const classes =
    "flex flex-col py-8 px-8 my-4 bg-emerald-700 text-black rounded-xl shadow-lg space-y-4 h-full";

  return (
    <TodoContainer title={title}>
      {completedTodos.map((todo) => {
        return (
          <li key={todo.id} className={classes}>
            <h2 className="text-lg font-semibold">{todo.text}</h2>
            <button
              className="p-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 text-center"
              onClick={() => handleButtonClick(todo.id)}
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
          </li>
        );
      })}
    </TodoContainer>
  );
};
