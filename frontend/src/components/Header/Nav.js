import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserStateContext } from "../../context/Context";
import { styled } from "@material-ui/styles";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import { useHistory } from "react-router";
export default function Nav() {
  const { setSuccessed, successed, users, resetUser } =
    useContext(UserStateContext);
  const history = useHistory();

  const DashboardLayoutRoot = styled("div")(() => ({
    display: "flex",
    height: "100%",
    backgroundColor: "black",
    overflow: "hidden",
    width: "100%",
  }));

  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    resetUser();
    setSuccessed(false);
    history.push("/");
  };

  let buttons;
  if (successed) {
    buttons = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"></li>
        <DashboardLayoutRoot>
          <NavBar
            Logout={handleLogout}
            onMobileNavOpen={() => setMobileNavOpen(true)}
          />
          <Sidebar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
            userInfo={users}
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
