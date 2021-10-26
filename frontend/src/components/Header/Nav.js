import React, { useState, useEffect, useContext } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { UserStateContext } from "../../Context/Context";
import { styled } from "@material-ui/styles";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "../User/Profile";
import Home from "../Home/Home";
import { useHistory } from "react-router";
import { Divider } from "@material-ui/core";
export default function Nav(props) {
  const history = useHistory();
  const DashboardLayoutRoot = styled("div")(() => ({
    // backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    backgroundColor: "black",
    overflow: "hidden",
    width: "100%",
  }));

  const DashboardLayoutWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundColor: "red",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  }));

  const DashboardLayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  });

  const DashboardLayoutContent = styled("div")({
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
    backgroundColor: "darkblue",
  });

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  console.log("isMobileNavOpen", isMobileNavOpen);
  const { user } = useContext(UserStateContext);
  const handleLogout = () => {
    localStorage.clear();
    props.setUsers(null);
    history.push("/");
  };

  let buttons;
  if (props.user) {
    buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"></li>
        <DashboardLayoutRoot>
          <Navbar
            Logout={handleLogout}
            onMobileNavOpen={() => setMobileNavOpen(true)}
          />
          <Sidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            userInfo={props.user}
          />
        </DashboardLayoutRoot>
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
