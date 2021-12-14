import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import UserProfile from "./UserProfile";
import MainLayout from "../../layout/MainLayout";
import { useState, useContext } from "react";
import { UserStateContext } from "../../context/Context";

const Profile = () => {
  const [imgPreview, setImgPreview] = useState(null);
  const { users } = useContext(UserStateContext);
  return (
    <MainLayout>
      <Helmet>
        <title>프로필 | Battle-Q</title>
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
            <Grid item lg={6} md={6} xs={12}>
              {/*  내정보 프로필 이미지 업로드*/}
              <ProfileAvatar users={users} imgPreview={imgPreview} />
            </Grid>
            {/*  내정보 프로필 기본이미지*/}
            <Grid item lg={6} md={6} xs={12}>
              <UserProfile users={users} setImgPreview={setImgPreview} />
            </Grid>
            {/*  내정보 */}
            <Grid item lg={12} md={6} xs={12}>
              <ProfileDetails users={users} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Profile;
