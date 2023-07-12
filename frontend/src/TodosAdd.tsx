import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddTodo } from "./services/TodoServices";

const TodosAddInput = () => {
  return (
    <label>
      Add a todo
      <input name="todo" type="text" />
    </label>
  );
};

export const TodosAdd = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoValue = new FormData(event.currentTarget).get("todo");

    try {
      if (!todoValue) {
        return;
      }

      await handleAddTodo(todoValue);

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
