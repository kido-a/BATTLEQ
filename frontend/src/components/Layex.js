import React from "react";
import MainLayout from "../layout/MainLayout";
import { Grid, Container, Box } from "@material-ui/core";

export default function Layex() {
  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: "lightpink",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
            display={"flex"}
            direction={"row"}
            // style={{ height: "1000px" }}

            height={880}
          >
            <Grid item xs={3} backgroundColor={"green"}>
              <Box
                sx={{
                  backgroundColor: "yellow",
                  height: "70%",
                }}
              >
                index 문제 버튼
              </Box>
              <Box
                sx={{
                  backgroundColor: "orange",
                  height: "30%",
                }}
              >
                돌아가기 버튼 (index 문제 버튼을 눌렀을 때)
              </Box>
            </Grid>
            <Grid item xs={6} backgroundColor={"darkblue"}>
              <Box
                sx={{
                  backgroundColor: "black",
                  height: "10%",
                  color: "white",
                }}
              >
                index번 문제
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "90%",
                }}
              >
                문제, 정답, 만들기
              </Box>
            </Grid>
            <Grid item xs={3} backgroundColor={"purple"} color="white">
              문제 타입, 점수, 점수 타입, 문제 등록
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            1
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            2
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            3
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            4
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            5
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            6
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            7
          </Box>
        </Grid>
      </Grid> */}
    </MainLayout>
  );
}
