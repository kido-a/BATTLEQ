import React, { useState } from "react";
import "../../styles/Quiz_make.css";
import { MenuItem, TextField, Button } from "@material-ui/core";
import Categories from "../Quiz/Data";
import ErrorMessage from "../../Error/ErrorMessage";
import { useHistory } from "react-router";
// import {} from "./Data/Categories";
const Quiz_make = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [oxchange, setOxchange] = useState(false);
  const history = useHistory();
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [limitTime, setLimitTime] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [point, setPoint] = useState("");
  const [pointType, setPointType] = useState("");
  const [quizId, setQuizId] = useState("");
  const [title, seTtitle] = useState("");
  const [type, seTtype] = useState("");

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  return (
    <div className="Quiz_make_wrapper">
      <span style={{ fontSize: 30 }}>Quiz Make</span>

      <div className="Quiz_make_inner">
        <div className="Quiz_make_select">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            1page
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            2page
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            3page
          </Button>
        </div>
        <div className="Quiz_make_select">
          <div className="Quiz_make_item">
            <TextField
              className="Quiz_make_item_min"
              style={{ marginBottom: 25 }}
              label="Enter your Question"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Quiz_make_item">
            <TextField
              style={{ marginBottom: 25 }}
              label="Correct answer"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: 25 }}
              label="Wrong answer"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: 25 }}
              label="Wrong answer"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: 25 }}
              label="Wrong answer"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="Quiz_make_select">
          <div className="Quiz_make_item_ox">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              O X 문제
            </Button>
          </div>
          <div className="Quiz_make_item_min">
            <TextField
              select
              label="Select Minute"
              variant="outlined"
              style={{ marginBottom: 30 }}
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <MenuItem key="10minute" value="10minute">
                {" "}
                10minute
              </MenuItem>
              <MenuItem key="15minute" value="15minute">
                {" "}
                15minute
              </MenuItem>
              <MenuItem key="20minute" value="20minute">
                {" "}
                20minute
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
            onClick={handleSubmit}
          >
            Add
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
        <div className="Quiz_make_select"></div>
      </div>
    </div>
  );
};

export default Quiz_make;
