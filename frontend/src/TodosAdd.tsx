import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  MouseEvent,
  ReactEventHandler,
  useState,
} from "react";

export const TodosAdd = () => {
  const [todoName, setTodoName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todoFormData = new FormData(event.currentTarget);

    await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        text: todoFormData.get("todo"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodoName("");
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
