import React from "react";
import { Box, Avatar, Button, Card, CardContent } from "@material-ui/core";

const UserProfile = (props) => {
  const defalutImg1 = "./profileDefaultCharacter1.png";
  const defalutImg2 = "./profileDefaultCharacter2.png";
  const defalutImg3 = "./profileDefaultCharacter3.png";

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            // flexDirection: "column",
          }}
        >
          <Button
            style={{ width: "150px", height: "180px" }}
            color="secondary"
            startIcon={<Avatar src={defalutImg1} />}
            onClick={() => props.setImgPreview(defalutImg1)}
          ></Button>
          <Button
            style={{ width: "150px", height: "180px" }}
            color="secondary"
            startIcon={<Avatar src={defalutImg2} />}
            onClick={() => props.setImgPreview(defalutImg2)}
          ></Button>
          <Button
            style={{ width: "150px", height: "180px" }}
            color="secondary"
            startIcon={<Avatar src={defalutImg3} />}
            onClick={() => props.setImgPreview(defalutImg3)}
          ></Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
