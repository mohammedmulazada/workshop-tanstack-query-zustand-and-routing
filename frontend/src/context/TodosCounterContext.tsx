import { createContext, ReactNode, useState } from "react";

export const TodosContext = createContext<{
  value: number;
  incrementValue: () => void;
  setNewTodoValue: (text: string) => void;
  todoValue: string;
}>({
  value: 0,
  incrementValue: () => {},
  setNewTodoValue: () => {},
  todoValue: "",
});

type Props = {
  children: ReactNode;
};

export const TodosContextProvider = (props: Props) => {
  const [value, setValue] = useState(0);
  const [todoValue, setNewTodoValue] = useState("");

  const incrementValue = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <TodosContext.Provider
      value={{ value, incrementValue, setNewTodoValue, todoValue }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
