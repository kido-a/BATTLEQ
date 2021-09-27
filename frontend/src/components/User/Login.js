import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserStateContext } from "../../Context/Context";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserStateContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      pwd: pwd,
    };

    axios
      .post("/member/login", data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data);
        localStorage.setItem("email", data.email);
        console.log("res : ", res);
        console.log("data : ", data);
        setLoggedIn(true);
        console.log("props : ", props);

        props.setUsers(data);
      })

      .catch((err) => {
        console.log(err.response);
        setMessage(err.response.data.message);
      });
  };
  if (loggedIn) {
    return <Redirect to={"/"} />;
  }

  let error = "";
  if (message) {
    error = (
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error}
        <h3>Login</h3>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          ></input>
        </div>

        <button className="btn btn-primary btn-block">Login</button>
        <p className="forgot-password text-right">
          <Link to={"/Forgot"}>Forgot password?</Link>
        </p>
      </form>
    </div>
  );
}
