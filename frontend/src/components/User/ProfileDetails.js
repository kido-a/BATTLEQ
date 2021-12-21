import { useContext } from "react";
import { UserStateContext } from "../../context/Context";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";

const ProfileDetails = () => {
  const { users, handleChange } = useContext(UserStateContext);

  const pwd = localStorage.getItem("pwd");

  const data = {
    authority: users.authority,
    email: users.email,
    emailAuth: "Y",
    nickname: users.nickname,
    profileImg: "string",
    pwd: pwd,
    userInfo: users.userInfo,
    userName: users.userName,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/member", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="사용자"
                name="userName"
                onChange={handleChange}
                required
                value={users.userName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="닉네임"
                name="nickname"
                onChange={handleChange}
                required
                value={users.nickname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="이메일"
                name="email"
                onChange={handleChange}
                required
                value={users.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default ProfileDetails;
