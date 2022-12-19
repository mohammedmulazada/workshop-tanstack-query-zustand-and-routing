import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodosContext } from "./context/TodosCounterContext";
import { handleAddTodo } from "./services/TodoServices";

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
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!todoValue) {
        return;
      }

      await handleAddTodo(todoValue);

      setNewTodoValue("");
      incrementValue();

      navigate("/");
    } catch (error) {}
  };
  return (
    <form className="addtodo" method="POST" onSubmit={handleSubmit}>
      <TodosAddInput />
      <button>Submit</button>
    </form>
  );
};
