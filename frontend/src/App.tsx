import { useContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { TodosContext } from "./context/TodosCounterContext";
import { TodosAdd } from "./TodosAdd";

function App() {
  const params = useParams();
  const { todoId } = params;

  const { value } = useContext(TodosContext);

  return (
    <div className="App">
      <header className="px-8 py-8 fixed top-0 left-0 w-full flex">
        <span className="pr-8">Amount of todos added: {value}</span>
        {todoId && (
          <nav>
            <ul>
              <li>
                <Link to={""}>Back to home</Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <Outlet />
      <TodosAdd />
    </div>
  );
}

export default App;
