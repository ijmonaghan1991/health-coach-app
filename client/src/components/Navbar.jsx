import {
  Link,
  NavLink,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Vitality
      </Link>

      <div className="navLinks">
        <NavLink to="/services">
          Services
        </NavLink>

        {user && (
          <>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>

            <NavLink to="/coach">
              AI Coach
            </NavLink>
          </>
        )}

        {!user ? (
          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <Link
              className="button small"
              to="/register"
            >
              Get Started
            </Link>
          </>
        ) : (
          <button
            className="linkButton"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}