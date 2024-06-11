
import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./contexts/userContext.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TestPage from "./pages/TestPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/administration",
    element: <AdminDashboard />,
  },
  {
    path: "/ouvrages",
    element: <TestPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>

);
