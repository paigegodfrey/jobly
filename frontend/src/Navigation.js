import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import './Navigation.css';
import UserContext from "./UserContext";

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-4">
        <NavLink className="nav-link nav-link-main" to="/companies">
          Companies
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link nav-link-main" to="/jobs">
          Jobs
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link nav-link-main" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link nav-link-main" to="/" onClick={logout}>
          Log out
        </Link>
      </li>
    </ul>
  );

  const loggedOutNav = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav : loggedOutNav}
    </nav>
  );
}

export default Navigation;