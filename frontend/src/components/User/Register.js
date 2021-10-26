import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UserStateContext } from "../../Context/Context";
import { Link, Navigate } from "react-router-dom";
import { PhotoCamera } from "@material-ui/icons";

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

export default function Register() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [emailcheck, setEmailcheck] = useState("");
  const [regist, setRegist] = useState(false);
  const [message, setMessage] = useState("");
  const [httpStatusCode, setHttpStatusCode] = React.useState();

  const [profile, setProfile] = useState("profile_default_character1"); // 회원가입 시 들어가는 프로필 사진.

  const { profile__img, setProfile__img } = useContext(UserStateContext); // Profile.js에서도 값을 보내기 위한 useContext setProfile__img(profile)
  const theme = createTheme();
  // const save_img = "./" + profile + ".png";
  // setProfile(save_img);

  // const save_img = "./" + profile_img + ".png";
  // setProfile__img(save_img);

  console.log("profile__img : ", profile__img);
  console.log("profile : ", profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("email", email);
    formData.append("nickname", nickname);
    formData.append("authority", "ROLE_ADMIN");
    formData.append("userInfo", "테스트 유저입니다.");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const data = {
      email: email,
      pwd: pwd,
      nickname: nickname,
      userName: userName,
      authority: "ROLE_ADMIN",
      userInfo: "테스트 유저입니다.",
    };

    axios
      .post("http://localhost:8080/member/regist", data)
      // .post("http://3.37.99.78:8080/member/regist", formData, config)
      .then((res) => {
        console.log(res);
        setRegist(true);
      })
      .catch((err) => {
        setMessage("이메일을 확인해주세요");
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    console.log("picture : ", e.target.files[0]);
    const file = e.target.files[0];
    setProfile(file); // 회원가입 시 들어갈 프로필 사진
    setProfile__img(file); //useContext 변수 Profile과 update에서 사용하기 위함.
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
              id="username"
              label="사용자 이름"
              name="username"
              autoComplete="uname"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="nname"
              name="nickName"
              required
              fullWidth
              id="nickName"
              label="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // inputProps={{
              //   autoComplete: "off",
              // }}
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            name="profile"
            onChange={handleFileChange}
          />
          {/* { input과 결합. (input의 id값과 label의 id값을 같게)} */}
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="success" component="span">
              <PhotoCamera /> 프로필 추가
            </Button>
          </label>
        </Grid>

        <Grid item xs={12}>
          {error}
          {check}
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
