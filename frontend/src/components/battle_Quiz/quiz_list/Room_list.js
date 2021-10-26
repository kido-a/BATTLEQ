import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";

// import getInitials from "../../../utils/getInitials";

const Room_list = (props) => {
  const history = new useHistory();
  const quizSearchClick = () => {
    history.push({
      pathname: `/room/${props.name}`,
      quizItems: props.quizItems,
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
          <Avatar src={props.thumbnail} sx={{ mr: 2 }}>
            {props.name}
          </Avatar>
          <Typography color="textPrimary" variant="body1">
            {props.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.introduction}</TableCell>
      <TableCell>{props.category}</TableCell>
    </TableRow>
  );
};

export default Room_list;
