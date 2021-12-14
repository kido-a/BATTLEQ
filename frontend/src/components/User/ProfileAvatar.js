import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

import axios from "axios";
import { useState } from "react";

const ProfileAvatar = (props) => {
  const [imgPreview, setImgPreview] = useState(null);
  const [uploadImg, setUploadImg] = useState(null);
  const [error, setError] = useState(false);
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // (key, value)
    formData.append("file", uploadImg);

    // FormData의 key 확인

    for (let key of formData.keys()) {
      console.log(key);
    }

    // FormData의 value 확인
    for (let value of formData.values()) {
      console.log(value);
    }

    const config = {
      headers: {
        email: email,
        accessToken: `${localStorage.getItem("accessToken")}`,
        // "Access-Control-Allow-Origin": "*",
        "content-type": "multipart/form-data",
      },
    };

    axios
      // .post("http://localhost:8080/member/regist", data)
      .post("http://localhost:8080/member/profile", formData, config)
      // .post("http://localhost:8080/member/profile", config, formData)
      // .post("http://3.37.99.78:8080/member/regist", formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("실패");
        console.log(err);
      });
  };

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    setUploadImg(selected);

    const ALLOWED_TYPES = ["image/pg", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      console.log("selected", selected);

      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
      console.log("file not supported");
    }
  };

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={!imgPreview ? props.users.profileImg : imgPreview}
            sx={{
              height: 100,
              width: 100,
            }}
          />

          <Typography color="textPrimary" gutterBottom variant="h3">
            {props.users.userName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {!imgPreview && (
          <>
            <Button color="primary" fullWidth variant="text" component="label">
              <Typography>{"Select Image"}</Typography>
              <input
                id={"file-input"}
                style={{ display: "none" }}
                type="file"
                name="imageFile"
                onChange={handleImageChange}
              />
            </Button>
          </>
        )}
        {imgPreview && (
          <>
            <Button
              color="primary"
              fullWidth
              variant="text"
              component="label"
              onClick={handleSubmit}
            >
              <Typography>{"Upload image"}</Typography>
            </Button>
            <Button
              color="primary"
              fullWidth
              variant="text"
              component="label"
              onClick={() => setImgPreview(null)}
            >
              <Typography>{"Remove Image"}</Typography>
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProfileAvatar;
