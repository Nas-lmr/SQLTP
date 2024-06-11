import { useState } from "react";
import "../App.css";
import UseAuthContext from "./contex/useContext";
function Signup() {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    adherent_id: "",
  });
  const { authUser } = UseAuthContext();
  console.log(authUser && authUser.user.userRole);
  const handleChange = (e) => {
    setSignup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchSignup = () => {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8800/user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("There is no data that has been fetched");
          }
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const handleClick = () => {
    fetchSignup()
      .then((data) => {
        setSignup(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="app">
      <form className="signup" onSubmit={(e) => e.preventDefault()}>
        <h1>Signup</h1>
        <label>Email</label>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <label>Adherent ID</label>
        <input
          type="number"
          placeholder="Adherent ID"
          name="adherent_id"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleClick}>
          Sign-Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
