import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import Questions from "./Questions";
import "../../styles/Quiz.css";
const Quiz = (props) => {
  const [options, setOptions] = useState("");
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    console.log(props.questions);
    setOptions(
      props.questions &&
        handleShuffle([
          props.questions[currQues]?.correct_answer, // ? -> 값이 없을수도 있을수도 있는 값을 underdefined로 표기해 error가 아니게 해줌.
          ...props.questions[currQues]?.incorrect_answers, // ...는 스프레드 연산자
        ])
    );
  }, [props.questions, currQues]);

  console.log(options);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle"> Welcome, {props.name} </span>

      {props.questions ? (
        <>
          <div className="quizInfo">
            <span> {props.questions[currQues].category}</span>
            <span> Score: {props.score}</span>
          </div>

          <Questions
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={props.questions}
            options={options}
            correct={props.questions[currQues]?.correct_answer} // 질문의 정담
            score={props.score} // 정답 점수
            setScore={props.setScore} // 점수 설정
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
