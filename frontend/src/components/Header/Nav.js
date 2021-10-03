import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { UserStateContext } from "../../Context/Context";

export default function Nav(props) {
  const { user } = useContext(UserStateContext);
  const handleLogout = () => {
    localStorage.clear();
    props.setUsers(null);
  };
  let buttons;
  if (props.user) {
    console.log("props.user", props.user);

    buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavDropdown title={user.email}>
            <NavDropdown.Item>
              {" "}
              <Link to={"/Profile"} className="nav-link">
                {" "}
                Profile{" "}
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              {" "}
              <Link to={"/"} onClick={handleLogout} className="nav-link">
                {" "}
                Logout{""}
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          {/* <Link to={"/"} onClick={handleLogout} className="nav-link">
            Logout
          </Link> */}
        </li>
        <li>
          <Link to={"/"} className="nav-link">
            게임 시작
          </Link>
        </li>
      </ul>
    );
  } else {
    buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Sign up
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light fixed-top">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="collapse navbar-collapse">{buttons}</div>
        </div>
      </nav>
    </div>
  );
}
