import { useState } from "react";
import "../App.css";
import UseAuthContext from "./contex/useContext";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = UseAuthContext();

  const handleChange = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchLogin = () => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8800/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: login.email, password: login.password }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("erreur de fetch");
          }
          return res.json();
        })
        .then((data) => {
          resolve(data);

          const userData = data;

          // Update the auth context with the user data
          dispatch({ type: "LOGIN", payload: userData });
          // Save in the local storage
          localStorage.setItem("user", JSON.stringify(userData));
        })
        .catch((err) => {
          console.error("Login error:", err);
          reject(err);
        });
    });
  };

  const handleClick = () => {
    fetchLogin();
  };

  return (
    <div className="app">
      <form className="signup" onSubmit={(e) => e.preventDefault()}>
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={login.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={login.password}
          onChange={handleChange}
        />

        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
