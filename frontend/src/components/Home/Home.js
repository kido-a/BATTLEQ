import React, { useEffect, useContext } from "react";
import { UserStateContext } from "../../context/Context";
import axios from "axios";
import { Grid, Box } from "@material-ui/core";
import { Helmet } from "react-helmet";
import MainLayout from "../../layout/MainLayout";
import { Circle as CircleIcon, X as XIcon } from "react-feather";

const Home = () => {
  const { users, successed, setUsers, setSuccessed } =
    useContext(UserStateContext);

  const email = localStorage.getItem("email");
  const headers = {
    accessToken: `${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(() => {
    (async () => {
      await axios

        .get(`/member/detail/${email}`, {
          // .get(`http://localhost:8080/member/detail/${email}`, {
          // .get(`http://3.37.99.78:8080/member/detail/${email}`, {
          headers,
        })

        .then(
          (res) => {
            const datauser = res.data.data;

            console.log("datauser : ", datauser);

            setSuccessed(true);
            setUsers({
              ...users,
              email: datauser.email,
              nickname: datauser.nickname,
              userName: datauser.userName,
            });
          },
          (err) => {
            console.log(err);
          }
        );
    })();
  }, [successed]);

  if (successed) {
    return (
      <MainLayout>
        <Helmet>
          <title>Battle-Q</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: "background.default",
            width: "100%",
            minHeight: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <Grid xs={2} className="gridclass">
            <CircleIcon size={200} color="blue" className="circleAnimation" />
          </Grid>
          <Grid>
            <XIcon size={250} color="red" className="xAnimation" />
          </Grid>
        </Box>
      </MainLayout>
    );
  } else
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          alt="Example Alt"
          src="/hometitle.png"
          height="100%"
          width="100%"
          backgroundColor="blue"
        />
      </Box>
    );
};

export default Home;
