import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { TodosAdd } from "./TodosAdd";

function App() {
  const params = useParams();
  const { todoId } = params;

  return (
    <div className="App">
      <header>
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
