import React, { Component, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import MainLayout from "../../layout/MainLayout";
import { Circle as CircleIcon, X as XIcon } from "react-feather";

const Home = ({ user }) => {
  if (user) {
    return (
      <MainLayout>
        <Helmet>
          <title>Battle-Q | Material Kit</title>
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
          // flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          alt="Example Alt"
          src="/homePic.jpg"
          height="100%"
          width="100%"
          backgroundColor="blue"
        />
      </Box>
    );
};

export default Home;
