import React, { useState } from "react";
import "../../styles/Quiz_title.css";
import { MenuItem, TextField, Button } from "@material-ui/core";
import ErrorMessage from "../../Error/ErrorMessage";
import Categories from "../Quiz/Data";
import { useHistory } from "react-router";

const Quiz_title = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [oxchange, setOxchange] = useState(false);
  const history = useHistory();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz_make");
    }
  };

  return (
    <div>
      <div className="quiz_title_wrapper">
        <div className="quiz_title_inner">
          <span style={{ fontSize: 30 }}>Quiz Title make</span>
          <div className="quiz_title_settings">
            {error && <ErrorMessage>Please Fill all the fields</ErrorMessage>}
            <TextField
              style={{ marginBottom: 25 }}
              label="Enter Quiz Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ marginBottom: 25 }}
              label="Enter Introduction"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              select
              label="Select Category"
              variant="outlined"
              style={{ marginBottom: 30 }}
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <MenuItem key="It" value="it">
                {" "}
                It
              </MenuItem>
              <MenuItem key="Game" value="game">
                {" "}
                Game
              </MenuItem>
              <MenuItem key="Fun" value="fun">
                {" "}
                Fun
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Make Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz_title;
