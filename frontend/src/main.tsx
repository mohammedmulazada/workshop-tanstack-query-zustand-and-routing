import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { TodosDetail } from "./TodosDetail";
import { TodosOverview } from "./TodosOverview";
import { MyContextProvider } from "./context/TodosCounterContext";

import "./index.css";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <TodosOverview /> },
      {
        path: "/todos/:todoId",
        element: <TodosDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MyContextProvider>
        <RouterProvider router={router} />
      </MyContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
