import { ReactNode } from "react";

type Props = {
  title: string | ReactNode;
  children: ReactNode;
};

export const TodoContainer = (props: Props) => {
  const { title, children } = props;
  return (
    <div className="py-8">
      <h1 className="py-8">{title}</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {children}
      </ul>
    </div>
  );
};
