import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../../styles/Quiz_room.css";
import QuizFilter from "./QuizFilter";
import TitleList from "./quizList/TitleList";
import MainLayout from "../../layout/MainLayout";
import { Container, Box } from "@material-ui/core";
import { UserStateContext } from "../../context/Context";
const QuizSearch = () => {
  const { quizSearch, setQuizSearch, quizSearchFilter, setQuizSearchFilter } =
    useContext(UserStateContext);

  useEffect(() => {
    const quizSearch = async () => {
      const {
        data: { data },
        // } = await axios.get("http://3.37.99.78:8080/api/v1/quiz/");
      } = await axios.get("/api/v1/quiz/");

      setQuizSearch(data);
    };

    quizSearch();
  }, []);
  const quizsSearch = quizSearch;

  const filterChangeHandler = (selectedYear) => {
    setQuizSearchFilter(selectedYear);
  };

  const quizSearchTitle = quizsSearch.filter((quizs) => {
    return quizs.name.indexOf(quizSearchFilter) !== -1;
  });

  return (
    <MainLayout>
      <Helmet>
        <title>퀴즈목록 | Battle-Q</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <QuizFilter
            selected={quizSearchFilter}
            onChangeFilter={filterChangeHandler}
          />{" "}
          <Box sx={{ pt: 3 }}>
            <TitleList quizRoomData={quizSearchTitle} />
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default QuizSearch;
