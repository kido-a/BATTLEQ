import React, { useState, useContext, useEffect, useRef } from "react";
import "../../styles/Quiz_make.css";
import { useHistory, useNavigate } from "react-router";

import { MenuItem, TextField, Button } from "@material-ui/core";

import Page_Button_list from "./Page_Button/Page_Button_list";
import axios from "axios";

import MainLayout from "../../layout/MainLayout";

// import {} from "./Data/Categories";
const Quiz_make = ({ quizId, ownerId }) => {
  const history = useHistory();
  // const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [oxchange, setOxchange] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const [point, setPoint] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [pagebutton, setPagebutton] = useState([]);
  const [pointType, setPointType] = useState("");
  const [quizitems, setQuizitems] = useState([]);
  const [quizitem_arr, setQuizitem_arr] = useState("");
  const [quizItemId, setQuizItemId] = useState(0);
  const [quiz_item_count, setQuiz_item_count] = useState(0);
  const [page_button_quizItemId, setPage_button_quizItemId] = useState(0);
  // const { quizId } = useContext(UserStateContext);

  /*
   Quiz_title에서 Quiz_make로 quizId값이 넘어오긴 하지만 새로고침 했을 경우 quizId값이 0으로 바뀜.
   useEffect를 사용했을 경우 새로고침 시 자동으로 실행되는데 quizId는 값이 0으로 처리됨
   하지만 quizId값을 받아온 이후 quizId값을 출력하는 버튼을 실행하면
   quiz_title에서 받아온 id값이 0이 아닌 받아온 값으로 출력됨.

  */
  const quizId_make = quizId;
  const ownerId_make = ownerId;

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchresponse = await axios.get(
        `/api/v1/quizItem/quiz/${quizId_make}`
        // `http://3.37.99.78:8080/api/v1/quizItem/quiz/${quizId_make}`
      );

      const userinfo = fetchresponse.data.data;
      console.log("quiz_item_count", quiz_item_count);
      console.log("userinfo", userinfo);
      console.log("quizId : ", quizId_make);
      console.log("ownerId(memberid) : ", ownerId_make);
      console.log("pagebutton", pagebutton);
      console.log("quizitems", quizitems);
      // if (quiz_item_count === 5) {
      //   history.push("/");
      // }
    };

    fetchUsers();
  }, [quiz_item_count]);
  //값 확인하기 위해 type 바꿀떄마다 로그 출력.

  const handleSubmit = () => {
    console.log(quizId_make);
    // history.push("/quiz");
    // 문제가 만들어진 유무 상관없이 버튼을 눌렀을 때 값을 넣을 것이냐...
    // const nextButton = pagebutton.concat({
    //   id: nextButton.length,
    //   number: nextButton.length,
    // });

    const data = {
      // content: content,
      // item_image: item_image,
      // limitTime: limitTime,
      // point: point,
      // title: title,
      // type: type,
      // pointType: pointType,
      // quizId: quizId_make,
      // ownerId : ownerId_make,
      content: content,
      image:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      limitTime: limitTime,
      ownerId: ownerId_make,
      point: point,
      pointType: pointType,
      quizId: quizId_make,
      title: title,
      type: type,
    };
    // 문제 만들었을 때 생성되는 res.data.id는 quizItemId 문제 만들때 마다 각각 부여.
    axios
      .post("http://localhost:8080/api/v1/quizItem", data)
      // .post("http://3.37.99.78:8080/api/v1/quizItem", data)
      .then((res) => {
        alert("문제를 만들었습니다 다음 문제를 작성하세요");
        console.log("res : ", res);
        console.log("res.data : ", res.data);
        console.log("res.data.id : ", res.data.id);
        const quizItemId = res.data.id;
        setQuizItemId(quizItemId);
        console.log("data : ", data);
        setQuiz_item_count(quiz_item_count + 1);
        console.log("quiz_item_count : ", quiz_item_count);
        setType("");
        setPointType("");
        setLimitTime("");
        //   배열의 인덱스로 id, number 값을 넣을 것인가 아니면 만들었을 때 생성되는 quizItemId로 넣을까. 혹시 모르니 둘다 넣어버리자.
        const nextButton = pagebutton.concat({
          id: pagebutton.length,
          number: pagebutton.length,
          quizItemId: quizItemId,
        });
        setPagebutton(nextButton);
        const nextquizs = quizitems.concat({
          id: quizitems.length,
          data: data,
        });
        setQuizitems(nextquizs);
      })
      .catch((err) => {
        console.log(err);
      });
    setTitle("");
    setContent("");
    setPoint("");
  };
  console.log(title);

  const Update_Page = (e) => {
    e.preventDefault();
    const data = {
      content: content,
      image:
        "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
      limitTime: limitTime,
      ownerId: ownerId_make,
      point: point,
      pointType: pointType,
      quizId: quizId_make,
      title: title,
      type: type,
    };
    axios
      .put(
        `http://localhost:8080/api/v1/quizItem/${page_button_quizItemId}`,
        // `http://3.37.99.78:8080/api/v1/quizItem/${page_button_quizItemId}`,
        data
      )
      .then((res) => {
        alert("수정 완료");

        console.log("수정 성공");
        console.log("현재 퀴즈아이템 아이디 : ", page_button_quizItemId);
        console.log("res : ", res.data);
      })
      .catch((err) => {
        console.log("수정 실패");
        console.log(err);
      });
  };

  const Reset = () => {
    // setTitle("");
    // setContent(" ");
    // setPoint(" ");
    history.push("/");
    // navigate("/");
  };

  return (
    <MainLayout>
      <div className="Quiz_make_wrapper">
        <span style={{ fontSize: 30 }}>Quiz Make</span>
        <div className="Quiz_make_inner">
          <div className="Quiz_make_select">
            <Page_Button_list
              pagebutton={pagebutton}
              setPagebutton={setPagebutton}
              setQuizitem_arr={setQuizitem_arr}
              quizitem_arr={quizitem_arr}
              setTitle={setTitle}
              setContent={setContent}
              setPoint={setPoint}
              setType={setType}
              setLimitTime={setLimitTime}
              setPointType={setPointType}
              setPage_button_quizItemId={setPage_button_quizItemId}
            />
          </div>
          <div className="Quiz_make_select">
            <div className="Quiz_make_item">
              <TextField
                style={{ marginBottom: 25 }}
                label="Enter your Question"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="Quiz_make_item">
              <TextField
                style={{ marginBottom: 25 }}
                label="Correct answer"
                variant="outlined"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="Quiz_make_select">
            <div className="Quiz_make_item_ox"></div>
            <div className="Quiz_make_item_min">
              <TextField
                select
                label="Select pointType"
                variant="outlined"
                style={{ marginBottom: 30 }}
                onChange={(e) => setType(e.target.value)}
                value={type}
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
                variant="outlined"
                value={point}
                onChange={(e) => setPoint(e.target.value)}
              />
            </div>
            <div className="Quiz_make_item_min">
              <TextField
                select
                label="Select Minute"
                variant="outlined"
                style={{ marginBottom: 30 }}
                onChange={(e) => setLimitTime(e.target.value)}
                value={limitTime}
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
                style={{ marginBottom: 30 }}
                onChange={(e) => setPointType(e.target.value)}
                value={pointType}
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
              onClick={Update_Page}
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
              onClick={Reset}
            >
              그만 만들기
            </Button>
          </div>
          {/* <Div>{"This div's text looks like that of a button."}</Div> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Quiz_make;
