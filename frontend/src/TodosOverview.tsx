import { Link } from "react-router-dom";
import { Todo } from "../../types/Todo";
import { useTodosQuery } from "./hooks/useTodo";

const filterCompletedTodos = (todo: Todo) => {
  return todo.completed;
};

const filterUncompletedTodos = (todo: Todo) => {
  return !todo.completed;
};

type TodosProps = {
  todos: Todo[];
  completed?: boolean;
};

const TodosList = (props: TodosProps) => {
  const { todos, completed } = props;

  const title = completed ? "Completed todo's" : "Uncompleted todo's";

  if (!todos || !todos.length) {
    return null;
  }

  const classes = completed
    ? "py-8 px-8 my-4 max-w-sm bg-emerald-700 text-black rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
    : "py-8 px-8 my-4 max-w-sm bg-gray-300 text-black rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6";

  return (
    <div className="py-8">
      <h1 className="py-8">{title}</h1>
      <ul>
        {todos.map((todo) => {
          return (
            <Link key={todo.id} to={`/todos/${todo.id}`}>
              <li key={todo.id} className={classes}>
                {todo.text}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export const TodosOverview = () => {
  const { data: todos, isLoading } = useTodosQuery({
    select: (state) => {
      return {
        completedTodos: state.filter(filterCompletedTodos),
        uncompletedTodos: state.filter(filterUncompletedTodos),
      };
    },
  });

  if (isLoading) {
    return <p>hang on... loading all todos...</p>;
  }

  return (
    <div>
      <TodosList completed todos={todos.completedTodos} />
      <TodosList todos={todos.uncompletedTodos} />
    </div>
  );
};
