import React from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Box,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

const RoomList = (props) => {
  console.log("props : ", props);
  const history = new useHistory();
  const quizSearchClick = () => {
    history.push({
      pathname: `/room/${props.quizData.name}`,
      quizItems: props.quizData.quizItems,
    });
  };

  return (
    <TableRow hover key={props.key} onClick={quizSearchClick}>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Avatar src={props.quizData.thumbnail} sx={{ mr: 2 }}>
            {props.quizData.name}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {props.quizDataname}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{props.quizData.name}</TableCell>
      <TableCell>{props.quizData.name}</TableCell>
      <TableCell>{props.quizData.introduction}</TableCell>
      <TableCell>{props.quizData.category}</TableCell>
    </TableRow>
  );
};

export default RoomList;
