import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { UserStateContext } from "../../Context/Context";

import { MenuItem, TextField, Button } from "@material-ui/core";
import "../../styles/Home.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [emailcheck, setEmailcheck] = useState("");
  const [regist, setRegist] = useState(false);
  const [message, setMessage] = useState("");
  const [httpStatusCode, setHttpStatusCode] = React.useState();

  const [profile_img, setProfile_img] = useState("profile_default_character1");
  const { profile__img, setProfile__img } = useContext(UserStateContext);

  const save_img = "./" + profile_img + ".png";

  setProfile__img(save_img);

  console.log("profile__img : ", profile__img);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      pwd: pwd,
      nickname: nickname,
      userName: userName,
      authority: "ROLE_ADMIN",
      userInfo: "테스트 유저입니다.",
      profile_img: save_img,
    };

    axios
      .post("/member/regist", data)
      .then((res) => {
        console.log(res);
        setRegist(true);
      })
      .catch((err) => {
        setMessage("이메일을 확인해주세요");
        console.log(err);
      });
  };

  const Overlap_email = (e) => {
    const overemail = email;
    e.preventDefault();
    axios
      .get(`http://localhost:8080/member/validate/email/${overemail}`)
      .then((res) => {
        console.log(res.status);
        setEmailcheck("사용 가능한 이메일 입니다.");
      })
      .catch((err) => {
        setEmailcheck("이미 사용중인 이메일 입니다.");
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

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      {error} {check}
      <div className="form-group">
        <div className="settings__select">
          <TextField
            select
            label="Select profileImg"
            variant="outlined"
            style={{ marginBottom: 15 }}
            onChange={(e) => setProfile_img(e.target.value)}
            value={profile_img}
          >
            <MenuItem
              key="profile_default_character1"
              value="profile_default_character1"
            >
              {" "}
              기본 이미지1
            </MenuItem>
            <MenuItem
              key="profile_default_character2"
              value="profile_default_character2"
            >
              {" "}
              기본 이미지2
            </MenuItem>
            <MenuItem
              key="profile_default_character3"
              value="profile_default_character3"
            >
              {" "}
              기본 이미지3
            </MenuItem>
          </TextField>
        </div>
        <div>
          <img src={profile__img} alt="profile_img" />
        </div>
        <label>nickname</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>userName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button className="btn btn-primary btn-block" onClick={Overlap_email}>
          중복확인
        </button>
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
      <button className="btn btn-primary btn-block">Sign up</button>
    </form>
  );
}
