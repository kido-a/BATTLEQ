import React from "react";
import Room_list from "./Room_list";
import PerfectScrollbar from "react-perfect-scrollbar";

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
const Title_list = (props) => {
  if (props.quizs_rooms.length === 0) {
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
              {props.quizs_rooms.map((quiz_list, index) => (
                <Room_list
                  key={index}
                  name={quiz_list.name}
                  introduction={quiz_list.introduction}
                  category={quiz_list.category}
                  thumbnail={quiz_list.thumbnail}
                  quizItems={quiz_list.quizItems}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={props.quizs_rooms.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

export default Title_list;
