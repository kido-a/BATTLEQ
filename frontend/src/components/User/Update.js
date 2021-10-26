import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, Navigate } from "react-router-dom";

export default function Update() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [update, setUpdate] = useState(false);

  const data = {
    email: email,
    pwd: pwd,
    nickname: nickname,
    userName: userName,
    authority: "ROLE_ADMIN",
    userInfo: "테스트 유저입니다.",
    emailAuth: "N",
  };

  const email_id = localStorage.getItem("email");
  const headers = {
    accessToken: `${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`/member/detail/kakao@kakao.com`, {
          // .get(`http://3.37.99.78:8080/member/detail/${email_id}`, {
          headers,
        })

        .then(
          (res) => {
            const datauser = res.data.data;
            setEmail(datauser.email);
            setNickname(datauser.nickname);
            setUserName(datauser.userName);
            console.log(datauser);
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    await axios
      .put("http://localhost:8080/member/modify", data)
      .then((res) => {
        console.log(res);
        setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (update) {
    return <Redirect to={"/"} />;
    // return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update</h3>
      <div className="form-group">
        <label>nickname</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nickname"
          name="nickname"
          defaultValue={nickname}
          onChange={(e) => setNickname(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>userName</label>
        <input
          type="text"
          name="userName"
          className="form-control"
          placeholder="UserName"
          defaultValue={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="pwd"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          ></input>
        </div>
      </div>
      <button className="btn btn-primary btn-block">변경하기</button>
    </form>
  );
}
