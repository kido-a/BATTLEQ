import React, { useEffect, useState } from "react";
import axios from "axios";
import Room_list from "./quiz_list/Room_list";
import { Helmet } from "react-helmet";
import "../../styles/Quiz_room.css";
import Quiz_Filter from "./Quiz_Filter";
import Title_list from "./quiz_list/Title_list";
import MainLayout from "../../layout/MainLayout";
import { Container, Grid, Box } from "@material-ui/core";
const Quiz_search = () => {
  const [quizs, setQuizs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search_input, setSearch_input] = useState("");
  useEffect(() => {
    const get_Quiz = async () => {
      const {
        data: { data },
      } = await axios.get("/api/v1/quiz/");
      // } = await axios.get("http://3.37.99.78:8080/api/v1/quiz/");

      //setupProxy에서 quizId를 따로 설정 안해도 불러와진다. id별로 불러올때 변수로 넣어서 하면 될듯
      // ex) => /api/v1/quiz/${quizid}

      //   .get("http://localhost:8080/api/v1/quiz") axios get할때는 꼭 앞에 localhost가 있으면 오류나더라.
      // /api/v1/quizItem은 앞에 localhost 있어야되네 없으면 3000으로 들어감.

      setQuizs(data);
    };

    get_Quiz();
  }, []);
  const quizs_room = quizs;

  const filterChangeHandler = (selectedYear) => {
    setSearch_input(selectedYear);
  };

  const Filter_title = quizs_room.filter((quizs) => {
    return quizs.name.indexOf(search_input) !== -1;
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
          <Quiz_Filter
            selected={search_input}
            onChangeFilter={filterChangeHandler}
          />{" "}
          <Box sx={{ pt: 3 }}>
            <Title_list quizs_rooms={Filter_title} />
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};
export default Quiz_search;
