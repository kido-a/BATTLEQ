import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";

import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const email = localStorage.getItem("email");
const headers = {
  accessToken: `${localStorage.getItem("accessToken")}`,
  "Access-Control-Allow-Origin": "*",
};

const Profile = (props) => {
  return (
    <MainLayout>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <ProfileAvatar profileInfo={props.user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <ProfileDetails profileInfo={props.user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Profile;
