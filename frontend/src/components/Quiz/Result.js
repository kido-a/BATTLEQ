import React, { useEffect } from "react";
import { Navigate, useHistory, useNavigate } from "react-router";
import { Button } from "@material-ui/core";
import "../../styles/Result.css";
import MainLayout from "../../layout/MainLayout";
const Result = (props) => {
  const history = useHistory();
  // const navigate = useNavigate();
  useEffect(() => {
    if (!props.name) {
      // 이름이 있는지 없는지 확인 없으면 홈으로
      history.pushState("/");
      // navigate("/");
    }
  }, [props.name, history]);
  return (
    <MainLayout>
      <div className="result">
        <span className="title">Final Score : {props.score}</span>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ alignSelf: "center", marginTop: 20 }}
          href="/"
        >
          Go To Home
        </Button>
      </div>
    </MainLayout>
  );
};

export default Result;
