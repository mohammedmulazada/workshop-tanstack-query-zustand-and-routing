import { FormEvent, useContext } from "react";
import {
  useTodoActions,
  useTodoAddMutation,
  useTodoText,
} from "./hooks/useTodo";
import { TodosContext } from "./context/TodosCounterContext";
import { useCounterActions } from "./hooks/useCounter";

const TodosAddInput = () => {
  const text = useTodoText();
  const { setText } = useTodoActions();
  return (
    <label>
      Add a todo
      <input
        name="todo"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </label>
  );
};

export const TodosAdd = () => {
  const { increment } = useCounterActions();
  const text = useTodoText();
  const { setText } = useTodoActions();

  const mutate = useTodoAddMutation().mutate;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text) {
      mutate(text);
      setText("");
      increment();
    }
  };
  return (
    <form className="addtodo" method="POST" onSubmit={handleSubmit}>
      <TodosAddInput />
      <button>Submit</button>
    </form>
  );
};
