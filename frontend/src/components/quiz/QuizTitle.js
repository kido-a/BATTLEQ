import React, { useContext } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  TextField,
  CssBaseline,
  Typography,
  Button,
  Box,
  MenuItem,
} from "@material-ui/core";
import { UserStateContext } from "../../context/Context";
import { useHistory } from "react-router";
import MainLayout from "../../layout/MainLayout";

const QuizTitle = () => {
  const history = useHistory();

  const { quizData, handleChange, setQuizId, setOwnerId } =
    useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: quizData.name,
      introduction: quizData.introduction,
      category: quizData.category,
      ownerId: quizData.ownerId,
      thumbnail: quizData.thumbnail,
    };

    axios
      .post("http://localhost:8080/api/v1/quiz", data)
      // .post("http://3.37.99.78:8080/api/v1/quiz", data)
      .then((res) => {
        console.log(res);

        setQuizId(res.data.id);
        setOwnerId(data.ownerId);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/quizMake");
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3">
            퀴즈 제작
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="제목"
              name="name"
              autoComplete="off"
              autoFocus
              value={quizData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="introduction"
              label="설명"
              id="introduction"
              autoComplete="off"
              value={quizData.introduction}
              onChange={handleChange}
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              name="category"
              id="category"
              label="카테고리"
              variant="outlined"
              style={{ marginBottom: 30 }}
              value={quizData.category}
              onChange={handleChange}
            >
              <MenuItem key="It" value="IT/인터넷">
                {" "}
                IT/인터넷
              </MenuItem>
              <MenuItem key="Game" value="Game">
                {" "}
                Game
              </MenuItem>
              <MenuItem key="Fun" value="Fun">
                {" "}
                Fun
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              퀴즈 문제 제작하기
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default QuizTitle;
