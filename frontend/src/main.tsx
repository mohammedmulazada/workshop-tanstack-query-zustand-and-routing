import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

import { TodosDetail } from "./TodosDetail";
import { TodosOverview } from "./TodosOverview";
import { MyContextProvider } from "./context/TodosCounterContext";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <TodosOverview /> },
      {
        path: "todos/:todoId",
        element: <TodosDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <RouterProvider router={router} />
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
