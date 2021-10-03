import React, { Component, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/Profile.css";
import { UserStateContext } from "../../Context/Context";

export default function Profile(props) {
  const { profile__img } = useContext(UserStateContext);

  const deleteRow = async (e) => {
    axios
      .delete(`http://localhost:8080/member/kakao@kakao.com`)
      .then((res) => {
        localStorage.clear();
        console.log("회원 삭제");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="profile_head">
        <div className="profile_img_div">
          <img src="./image1.png" className="profile_img" />
        </div>
        <div className="profile_info">
          <div>{profile__img}</div>
          <h2>이메일 : {props.user.email}</h2>
          <h2>닉네임 : {props.user.nickname}</h2>
          <h2>이름 : {props.user.userName}</h2>
        </div>
      </div>
      <div className="profile_button">
        <input
          className="imgInput"
          type="file"
          accept="image/png, image/jpeg"
          id="profileImg"
          name="profileImg"
        />
        <Link to={"/Update"} className="btn btn-primary btn-block">
          회원 변경
        </Link>

        <button
          onClick={(e) => {
            //   deleteRow(props.user.email, e);
            deleteRow(e);
          }}
          className="btn btn-primary btn-block"
        >
          회원 삭제
        </button>
      </div>
    </div>
  );
}
