import React, { useState, useContext } from "react";
// import "../../styles/Quiz_title.css";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  TextField,
  Avatar,
  Checkbox,
  CssBaseline,
  Grid,
  Typography,
  createTheme,
  FormControlLabel,
  Button,
  Box,
  Select,
  ThemeProvider,
  MenuItem,
} from "@material-ui/core";
import { UserStateContext } from "../../Context/Context";
import ErrorMessage from "../../Error/ErrorMessage";
import { useHistory } from "react-router";
import MainLayout from "../../layout/MainLayout";
const theme = createTheme();

const Quiz_title = ({ setQuizId, setOwnerId }) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  // const navigate = useNavigate();

  // const { quizId, setQuizId } = useContext(UserStateContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !introduction || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      history.push("/quiz_make");
      // navigate("/quiz_make");
    }

    const data = {
      name: name,
      introduction: introduction,
      category: category,
      ownerId: 1,
      thumbnail:
        "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
    };

    axios
      .post("http://localhost:8080/api/v1/quiz", data)
      // .post("http://3.37.99.78:8080/api/v1/quiz", data)
      .then((res) => {
        console.log(res);
        const make_quizid = res.data.id;
        console.log("make_quizid : ", make_quizid);
        setQuizId(make_quizid);
        setOwnerId(data.ownerId);
        // console.log("quizId : ", quizId);
        // setQuizId(quizId + make_quizid);
        // console.log("quizId : ", quizId);
      })
      .catch((err) => {
        console.log(err);
      });
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="introduction"
              label="설명"
              id="introduction"
              autoComplete="off"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

export default Quiz_title;
