import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import GoalView from "./pages/GoalView.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import Login from "./pages/Login.jsx";

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
        path: "/Category",
        element: <CategoryView />,
      },
      {
        path: "/Goal",
        element: <GoalView />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
