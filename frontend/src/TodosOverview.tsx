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
};

const CompletedTodos = (props: TodosProps) => {
  const { todos } = props;

  if (!todos || !todos.length) {
    return null;
  }

  return (
    <div>
      <h1>Completed todos</h1>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}> {todo.text}</Link>
          </li>
        );
      })}
    </div>
  );
};

const UncompletedTodos = (props: TodosProps) => {
  const { todos } = props;

  if (!todos || !todos.length) {
    return null;
  }

  return (
    <div>
      <h1>Uncompleted todos</h1>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.text}</Link>
          </li>
        );
      })}
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
      <CompletedTodos todos={todos?.completedTodos} />
      <UncompletedTodos todos={todos?.uncompletedTodos} />
    </div>
  );
};
