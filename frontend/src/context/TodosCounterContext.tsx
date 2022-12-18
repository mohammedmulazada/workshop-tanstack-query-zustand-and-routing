import { createContext, ReactNode, useState } from "react";

export const MyContext = createContext<{
  value: number;
  incrementValue: () => void;
}>({ value: 0, incrementValue: () => {} });

type Props = {
  children: ReactNode;
};

export const MyContextProvider = (props: Props) => {
  const [value, setValue] = useState(0);

  const incrementValue = () => {
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <MyContext.Provider value={{ value, incrementValue }}>
      {props.children}
    </MyContext.Provider>
  );
};
