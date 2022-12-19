import { FormEvent, useContext, useState } from "react";
import { useTodoAddMutation } from "./hooks/useTodo";
import { TodosContext } from "./context/TodosCounterContext";

const TodosAddInput = () => {
  const { todoValue, setNewTodoValue } = useContext(TodosContext);
  return (
    <label>
      Add a todo
      <input
        name="todo"
        onChange={(e) => setNewTodoValue(e.target.value)}
        value={todoValue}
      />
    </label>
  );
};

export const TodosAdd = () => {
  const { incrementValue, todoValue, setNewTodoValue } =
    useContext(TodosContext);

  const mutate = useTodoAddMutation().mutate;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoValue) {
      mutate(todoValue);
      setNewTodoValue("");
      incrementValue();
    }
  };
  return (
    <form className="addtodo" method="POST" onSubmit={handleSubmit}>
      <TodosAddInput />
      <button>Submit</button>
    </form>
  );
};
