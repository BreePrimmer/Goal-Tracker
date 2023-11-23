import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import GoalView from "./pages/GoalView.jsx";
import CategoryView from "./pages/CategoryView.jsx";
import Login from "./pages/Login.jsx";

<<<<<<< HEAD
import Test from "./pages/test.jsx";
=======
import Test from './pages/test.jsx';
>>>>>>> a96b3a1b5e3c8c86f660e9810df738fdc7dc83da

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
        path: "/Goal",
        element: <GoalView />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
<<<<<<< HEAD
        path: "/Test",
        element: <Test />,
      },
=======
        path: '/Test',
        element: <Test />
      }
>>>>>>> a96b3a1b5e3c8c86f660e9810df738fdc7dc83da
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
