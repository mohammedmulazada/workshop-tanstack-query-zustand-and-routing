import { CompletedTodos } from "./components/CompletedTodos";
import { UncompletedTodos } from "./components/UncompletedTodos";

export const TodosOverview = () => {
  return (
    <div>
      <CompletedTodos />
      <UncompletedTodos />
    </div>
  );
};
