import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import GoalView from "./pages/GoalView.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import Login from "./pages/Login.jsx";
import Error from "./pages/Error.jsx";

import Test from "./pages/test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/Category/:categoryName",
        element: <CategoryView />,
      },
      {
        path: "/Category/:categoryName/:goalId",
        element: <GoalView />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Test",
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
