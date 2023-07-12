import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { TodosAdd } from "./TodosAdd";

function App() {
  const params = useParams();
  const { todoId } = params;

  return (
    <div className="App">
      <header className="px-8 py-8 fixed top-0 left-0 w-full flex">
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
