import { Link, Outlet, useParams } from "react-router-dom";
import "./App.css";
import { TodosAdd } from "./TodosAdd";
import { useSelector } from "react-redux";
import {
  selectAllCompletedTodos,
  selectAllUncompletedTodos,
} from "./store/selectors/todoSelectors";
import Skeleton from "react-loading-skeleton";

function App() {
  const amountOfCompletedTodos = useSelector(selectAllCompletedTodos).length;
  const amountOfUncompletedTodos = useSelector(
    selectAllUncompletedTodos
  ).length;
  const params = useParams();
  const { todoId } = params;

  return (
    <div className="App">
      <header className="px-8 py-8 fixed top-0 left-0 w-full flex">
        <nav>
          <ul className="flex gap-4">
            {todoId && (
              <li>
                <Link to={""}>Back to home</Link>
              </li>
            )}
            <li>
              <p className="block">
                {amountOfCompletedTodos ? (
                  <span>Completed Todo's - {amountOfCompletedTodos}</span>
                ) : (
                  <Skeleton width={80} />
                )}
              </p>
            </li>
            <li>
              <p className="block">
                {amountOfUncompletedTodos ? (
                  <span>Uncompleted Todo's - {amountOfUncompletedTodos}</span>
                ) : (
                  <Skeleton width={80} />
                )}
              </p>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
      <TodosAdd />
    </div>
  );
}

export default App;
