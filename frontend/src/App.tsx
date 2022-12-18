import { useContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { MyContext } from "./context/TodosCounterContext";
import { TodosAdd } from "./TodosAdd";

function App() {
  const params = useParams();
  const { todoId } = params;

  const { value } = useContext(MyContext);

  return (
    <div className="App">
      <header>
        <span>Amount of todos added: {value}</span>
        <nav>
          <ul>
            {todoId && (
              <li>
                <Link to={""}> Home</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
      <TodosAdd />
    </div>
  );
}

export default App;
