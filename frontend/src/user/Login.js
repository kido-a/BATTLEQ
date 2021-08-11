import React, { Component } from "react";
import { Form, Input, Tooltip, Checkbox } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import homeimg from "../img/battle.jpg";
// import googleimg from "./google_img_normal.png";
import { Link } from "react-router-dom";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  InfoCircleOutlined,
  GoogleOutlined,
  GithubOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import styled from "styled-components";

function Login() {
  return (
    <>
      <div className="Login_wrapper">
        <div className="Login_form">
          <button className="Login_btn_home">
            <Link to="/">
              <img src={homeimg} />
            </Link>
          </button>
          <Form
            name={"normal_login"}
            className={"login-form"}
            initialValues={{ remember: true }}
            xs={{ span: 5, offset: 1 }}
            lg={{ span: 6, offset: 2 }}
          >
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please Input Your Email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={" 아이디 (예 : user@naver.com"}
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "please Input Your Password",
                },
              ]}
            >
              <Input
                type={"password"}
                placeholder=" 비밀번호"
                prefix={<LockOutlined className={"site-form-item-icon"} />}
              />
            </Form.Item>
            <div className="Login_check">
              <Checkbox checked={false}>아이디 저장</Checkbox>
            </div>

            <Form.Item>
              <Button
                type={"primary"}
                htmlType={"submit"}
                className={"login-form-button"}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>
          <div className="login_sub">
            <button className="login_sub_menu">
              <span>아아디 찾기</span>
            </button>
            <div className="login_sub_column"></div>
            <button className="login_sub_menu">
              <span>비밀번호 찾기</span>
            </button>
            <div className="login_sub_column"></div>
            <button className="login_sub_menu">
              <span>회원가입</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
