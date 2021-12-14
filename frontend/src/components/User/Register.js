import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UserStateContext } from "../../context/Context";
import { Link } from "react-router-dom";

import {
  TextField,
  Avatar,
  Grid,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

export default function Register() {
  const [emailcheck, setEmailcheck] = useState("");
  const [nicknameCheck, setnicknameCheck] = useState("");
  const [regist, setRegist] = useState(false);
  const [message, setMessage] = useState("");

  const { users, handleChange, resetUser } = useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: users.email,
      pwd: users.pwd,
      nickname: users.nickname,
      userName: users.userName,
      authority: users.authority,
      userInfo: users.userInfo,
    };

    axios
      .post("http://localhost:8080/member", data)
      // .post("http://3.37.99.78:8080/member", data)
      .then((res) => {
        console.log(res);
        setRegist(true);
      })
      .catch((err) => {
        setMessage("이메일을 확인해주세요");
        console.log(err);
      });
    resetUser();
  };

  const OverlapNickname = (e) => {
    const overNickName = users.nickname;
    e.preventDefault();
    axios
      // .get(`http://3.37.99.78:8080/member/validate/email/${overemail}`)
      .get(`http://localhost:8080/member/validate/nickname/${overNickName}`)
      .then((res) => {
        console.log(res.status);
        setnicknameCheck("사용 가능한 닉네임 입니다.");
      })
      .catch((err) => {
        if (users.nickname === "") {
          setnicknameCheck("닉네임을 입력하세요");
        } else setnicknameCheck("이미 사용중인 닉네임 입니다.");
      });
  };

  const OverlapEmail = (e) => {
    const overemail = users.email;
    e.preventDefault();
    axios
      // .get(`http://3.37.99.78:8080/member/validate/email/${overemail}`)
      .get(`http://localhost:8080/member/validate/email/${overemail}`)
      .then((res) => {
        console.log(res.status);
        setEmailcheck("사용 가능한 이메일 입니다.");
      })
      .catch((err) => {
        if (users.email === "") {
          setEmailcheck("이메일을 입력하세요");
        } else setEmailcheck("이미 사용중인 이메일 입니다.");
      });
  };

  if (regist) {
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

  let check = "";
  if (emailcheck) {
    check = (
      <div className="alert alert-danger" role="alert">
        {emailcheck}
      </div>
    );
  }
  let nickCheck = "";

  if (nicknameCheck) {
    nickCheck = (
      <div className="alert alert-danger" role="alert">
        {nicknameCheck}
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
        회원 가입
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="userName"
              label="사용자 이름"
              name="userName"
              autoComplete="off"
              value={users.userName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              name="nickname"
              required
              fullWidth
              id="nickname"
              label="닉네임"
              value={users.nickname}
            />
            <Button onClick={OverlapNickname}>중복확인</Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              d
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="off"
              value={users.email}
              onChange={handleChange}
            />
            <Button onClick={OverlapEmail}>중복확인</Button>
          </Grid>
          <Grid item xs={12} marginBottom={2}>
            <TextField
              required
              fullWidth
              name="pwd"
              label="비밀번호"
              type="password"
              id="pwd"
              autoComplete="new-password"
              value={users.pwd}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {error}
          {check}
          {nickCheck}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          회원 등록
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              계정이 이미 있으십니까? 로그인
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
