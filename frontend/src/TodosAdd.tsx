import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddTodo } from "./services/TodoServices";

const TodosAddInput = () => {
  return null;
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
  return null;
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
