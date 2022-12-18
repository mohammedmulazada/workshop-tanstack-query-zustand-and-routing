import { FormEvent, useContext, useState } from "react";
import { MyContext } from "./context/TodosCounterContext";
import { useTodoAddMutation } from "./hooks/useTodo";

export const TodosAdd = () => {
  const [todoName, setTodoName] = useState("");
  const { incrementValue } = useContext(MyContext);
  const mutate = useTodoAddMutation().mutate;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoFormData = new FormData(event.currentTarget);
    const todoNewName = todoFormData.get("todo");
    if (todoNewName) {
      mutate(todoNewName);
      setTodoName("");
      incrementValue();
    }
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
