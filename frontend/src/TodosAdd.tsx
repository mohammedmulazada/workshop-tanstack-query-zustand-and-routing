import { FormEvent, useContext, useState } from "react";
import { MyContext } from "./context/TodosCounterContext";
import { handleAddTodo } from "./services/TodoServices";

export const TodosAdd = () => {
  const [todoName, setTodoName] = useState("");
  const { incrementValue } = useContext(MyContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoFormData = new FormData(event.currentTarget);

    try {
      const todoValue = todoFormData.get("todo");

      if (!todoValue) {
        return;
      }

      await handleAddTodo(todoValue);

      setTodoName("");
      incrementValue();
    } catch (error) {}
  };
  return (
    <form className="addtodo" method="POST" onSubmit={handleSubmit}>
      <label>
        Add a todo
        <input
          name="todo"
          onChange={(e) => setTodoName(e.target.value)}
          value={todoName}
        />
      </label>

      <button>Submit</button>
    </form>
  );
};
