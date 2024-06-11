import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login";
import Home from "./components/Home.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import Pret from "./components/admin/Pret.jsx";
/* context  */
import { AuthContextProvider } from "./components/contex/userContex.jsx";
import UseAuthContext from "./components/contex/useContext.jsx";
import "./index.css";

// private fontion

const UserFunction = () => {
  const { authUser } = UseAuthContext();

  if (authUser?.user?.userRole === "Admin") {
    return <Dashboard />;
  } else {
    return <Home />;
  }
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <UserFunction />,
  },
  {
    path: "pret",
    element: <Pret />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
