import React from "react";
import RoomList from "./RoomList";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
const TitleList = (props) => {
  if (props.quizRoomData.length === 0) {
    return <h2 className="expenses-list__fallback"> Found no expenses.</h2>;
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>유저</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>부제목</TableCell>
                <TableCell>카테고리</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.quizRoomData.map((quizData, index) => (
                <RoomList key={index} quizData={quizData} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default TitleList;
