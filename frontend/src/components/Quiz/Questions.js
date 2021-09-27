import { Select, Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import ErrorMessage from "../../Error/ErrorMessage";
import "../../styles/Questions.css";
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelect = (i) => {
    if (selected === i && selected === correct) {
      // 정답이면 초록색
      return "select"; // className
    } else if (selected === i && selected !== correct) {
      // 잘못된 답 빨간색
      return "wrong"; // className
    } else if (i === correct) {
      // 잘못된 답을 눌렀을 경우 정답을 초록색으로.
      return "select";
    }
  };

  const history = useHistory();

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("please select an option first");
    }
  };

  const handleQuit = () => {};

  return (
    // {currQues + 1} => 퀴즈 넘버 currQues 퀴즈 인덱스
    //questions[currQues].question  퀴즈 내용
    <div className="question">
      <h2>Question {currQues + 1}</h2>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            // 정답 선택지
            options.map((i) => (
              <button
                onClick={() => handleCheck(i)}
                className={`singleOption ${selected && handleSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
