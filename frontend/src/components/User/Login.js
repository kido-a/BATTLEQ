// import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link, Navigate } from "react-router-dom";
import { UserStateContext } from "../../Context/Context";

import { Container } from "react-bootstrap";
import {
  TextField,
  Avatar,
  Checkbox,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  FormControlLabel,
  Button,
  Box,
  ThemeProvider,
} from "@material-ui/core";
import swal from "sweetalert";

export default function Login({ setUsers, setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [successCheck, setSuccessCheck] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      pwd: pwd,
    };

    axios
      // .post("http://3.37.99.78:8080/member/login", data)
      .post("http://localhost:8080/member/login", data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.data);
        localStorage.setItem("email", data.email);
        setSuccessCheck(true);

        // data는 이메일과 패스워드 App.js의 setUsers로 이메일과 패스워드 값을 넘기는 부분.
        // 그래서 로그인 직후 이메일은 바로 갱신이 되지만 다른 정보는 새로고침 해야 뜸.
        // 데이터 보내는 것 수정해야함 (상태관리를 어떻게 해야하는지 추후 수정 (usecontext, redux, mobx 등))

        setUsers(data);
      })

      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };

  if (successCheck) {
    swal("Success", {
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
          value={email}
          autoComplete="off"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="pwd"
          label="비밀번호"
          type="password"
          id="pwd"
          value={pwd}
          autoComplete="current-password"
          onChange={(e) => setPwd(e.target.value)}
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
