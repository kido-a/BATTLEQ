import React, { useContext, useEffect } from "react";
import "../../styles/Quiz_make.css";
import { useHistory, useNavigate } from "react-router";

import { MenuItem, TextField, Button } from "@material-ui/core";
import { UserStateContext } from "../../context/Context";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";
import ButtonNumberList from "./makeList/ButtonNumberList";
const QuizMake = () => {
  const {
    handleChange,
    quizId,
    ownerId,
    quizItemData,
    resetQuizItem,
    setQuizItemId,
    setQuizItemCount,
    quizItemId,
    quizItemCount,
    quizItemPage,
    setQuizItemPage,
    quizItemPageId,
    resetQuiz,
  } = useContext(UserStateContext);
  const history = useHistory();

  // 데이터를 확인하려고 작성 (추후 제거)
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchresponse = await axios.get(
        `/api/v1/quizItem/quiz/${quizId}`
        // `http://3.37.99.78:8080/api/v1/quizItem/quiz/${quizIdValue}`
      );

      const userinfo = fetchresponse.data.data;
      console.log("quizItemCount", quizItemCount);
      console.log("userinfo", userinfo);
      console.log("quizId : ", quizId);
      console.log("ownerId(memberid) : ", ownerId);
      console.log("quizItemPage", quizItemPage);
    };

    fetchUsers();
  }, [quizItemCount]);
  //값 확인하기 위해 type 바꿀떄마다 로그 출력.

  const data = {
    content: quizItemData.content,
    image: quizItemData.image,
    limitTime: quizItemData.limitTime,
    ownerId: ownerId,
    point: quizItemData.point,
    pointType: quizItemData.pointType,
    quizId: quizId,
    title: quizItemData.title,
    type: quizItemData.type,
  };

  const handleSubmit = () => {
    // 문제 만들었을 때 생성되는 res.data.id는 quizItemId 문제 만들때 마다 각각 부여.
    axios
      .post("http://localhost:8080/api/v1/quizItem", data)
      // .post("http://3.37.99.78:8080/api/v1/quizItem", data)
      .then((res) => {
        alert("문제를 만들었습니다 다음 문제를 작성하세요");
        console.log(res);
        const quizItemIdData = res.data.id;
        console.log("quizItemIdData : ", quizItemIdData);
        setQuizItemId(quizItemIdData);
        setQuizItemCount(quizItemCount + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("quizItemId : ", quizItemId);
    const nextButton = quizItemPage.concat({
      id: quizItemPage.length,
      number: quizItemPage.length,
      quizItemId: quizItemId,
    });
    setQuizItemPage(nextButton);
    resetQuizItem();
  };

  const updatePage = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8080/api/v1/quizItem/${quizItemPageId}`,
        // `http://3.37.99.78:8080/api/v1/quizItem/${quizItemPageId}`,
        data
      )
      .then((res) => {
        alert("수정 완료");

        console.log("수정 성공");
        console.log("현재 퀴즈아이템 아이디 : ", quizItemPageId);
        console.log("res : ", res.data);
      })
      .catch((err) => {
        console.log("수정 실패");
        console.log(err);
      });
  };

  const finish = () => {
    resetQuiz();
    history.push("/");
  };

  return (
    <MainLayout>
      <div className="Quiz_make_wrapper">
        <span style={{ fontSize: 30 }}>Quiz Make</span>
        <div className="Quiz_make_inner">
          <div className="Quiz_make_select">
            <ButtonNumberList />
          </div>
          <div className="Quiz_make_select">
            <div className="Quiz_make_item">
              <TextField
                style={{ marginBottom: 25 }}
                label="Enter your Question"
                variant="outlined"
                name="title"
                value={quizItemData.title}
                onChange={handleChange}
              />
            </div>
            <div className="Quiz_make_item">
              <TextField
                style={{ marginBottom: 25 }}
                name="content"
                label="Correct answer"
                variant="outlined"
                value={quizItemData.content}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="Quiz_make_select">
            <div className="Quiz_make_item_ox"></div>
            <div className="Quiz_make_item_min">
              <TextField
                select
                label="Select pointType"
                name="type"
                variant="outlined"
                style={{ marginBottom: 30 }}
                value={quizItemData.type}
                onChange={handleChange}
              >
                <MenuItem key="10minute" value="VOTE">
                  {" "}
                  O X
                </MenuItem>
                <MenuItem key="15minute" value="CHOSUNG">
                  {" "}
                  Sentence
                </MenuItem>
              </TextField>
            </div>
            <div className="Quiz_make_item">
              <TextField
                style={{ marginBottom: 25 }}
                label="Point"
                name="point"
                variant="outlined"
                value={quizItemData.point}
                onChange={handleChange}
              />
            </div>
            <div className="Quiz_make_item_min">
              <TextField
                select
                label="Select Minute"
                name="limitTime"
                variant="outlined"
                style={{ marginBottom: 30 }}
                X
                value={quizItemData.limitTime}
                onChange={handleChange}
              >
                <MenuItem key="10minute" value="10">
                  {" "}
                  10minute
                </MenuItem>
                <MenuItem key="15minute" value="15">
                  {" "}
                  15minute
                </MenuItem>
                <MenuItem key="20minute" value="20">
                  {" "}
                  20minute
                </MenuItem>
              </TextField>
            </div>
            <div className="Quiz_make_item_min">
              <TextField
                select
                label="Select pointType"
                variant="outlined"
                name="pointType"
                style={{ marginBottom: 30 }}
                value={quizItemData.pointType}
                onChange={handleChange}
              >
                <MenuItem key="10minute" value="single">
                  {" "}
                  Single
                </MenuItem>
                <MenuItem key="15minute" value="double">
                  {" "}
                  Double
                </MenuItem>
              </TextField>
            </div>
          </div>
        </div>
        <div className="Quiz_make_inner">
          <div className="Quiz_make_select">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={updatePage}
            >
              수정하기
            </Button>
          </div>
          <div className="Quiz_make_select">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              문제 만들기
            </Button>
          </div>

          <div className="Quiz_make_select">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={finish}
            >
              문제 등록
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizMake;
