import axios from "axios";
import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserStateContext } from "../../context/Context";

import {
  TextField,
  Avatar,
  Grid,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import swal from "sweetalert";

export default function Login() {
  const [message, setMessage] = useState("");

  const { users, handleChange, setSuccessed, successed } =
    useContext(UserStateContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: users.email,
      pwd: users.pwd,
    };

    axios
      // .post("http://3.37.99.78:8080/member/login", data)
      .post("http://localhost:8080/member/login", data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data);
        localStorage.setItem("email", data.email);
        localStorage.setItem("pwd", data.pwd);
        setSuccessed(true);
      })

      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  if (successed) {
    swal("로그인 성공", {
      timer: 5000,
    });
    return <Redirect to={"/"} />;
    // return <Navigate to={"/"} />;
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="h1" variant="h5">
        로그인
        {error}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="이메일"
          name="email"
          value={users.email}
          autoComplete="off"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="pwd"
          label="비밀번호"
          type="password"
          id="pwd"
          value={users.pwd}
          autoComplete="current-password"
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          로그인
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/register" variant="body2">
              {"계정이 없으신가요? 회원가입"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
