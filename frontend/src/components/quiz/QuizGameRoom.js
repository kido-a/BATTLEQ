import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Box, Container, Grid } from "@material-ui/core";

const QuizGameRoom = (props) => {
  const { location } = props;
  if (location) {
    return (
      <MainLayout>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                {location.quizItems.map((quizitems) => (
                  <div>
                    <h2 className="movie__title">title : {quizitems.title}</h2>
                    <h2 className="movie__title">
                      content : {quizitems.content}
                    </h2>
                    <h2 className="movie__title">
                      limitTime {quizitems.limitTime}
                    </h2>
                    <h2 className="movie__title">
                      {" "}
                      <img
                        className="quiz_room_img"
                        src={quizitems.image}
                        alt={quizitems.title}
                        title={quizitems.title}
                      />{" "}
                    </h2>
                    <h2 className="movie__title">
                      pointType : {quizitems.pointType}
                    </h2>
                    <h2 className="movie__title">point : {quizitems.point}</h2>
                    <h2 className="movie__title">
                      quizId : {quizitems.quizId}
                    </h2>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </MainLayout>
    );
  }
};

export default QuizGameRoom;
