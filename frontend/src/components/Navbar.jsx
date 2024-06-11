import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-menu">
        <Link className="link" to="/">
          {" "}
          Home-Page
        </Link>
        <Link className="link" to="/login">
          Login-Page
        </Link>
        <Link className="link" to="/signup">
          Signup-Page
        </Link>
        <Link className="link" to="/dashboard">
           Dashboard
        </Link>
      </div>
    </nav>
  );
}
