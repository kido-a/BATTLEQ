import React, { useState } from "react";
import axios from "axios";
import { MenuItem, TextField, Button } from "@material-ui/core";
const Page_Button_item = ({
  pagebutton,
  pageitem,
  setPagebutton,
  pageNumber,
  setPageNumber,
  setQuizitem_arr,
  setType,
  setContent,
  setTitle,
  setLimitTime,
  setPointType,
  setPoint,
  setPage_button_quizItemId,
}) => {
  const Click_Page = async () => {
    const Page_Button_item_info = await axios
      .get(`/api/v1/quizItem/${pageitem.quizItemId}`)
      // .get(`http://3.37.99.78:8080/api/v1/quizItem/${pageitem.quizItemId}`)

      .catch((err) => {
        console.log(err);
      });
    setPage_button_quizItemId(pageitem.quizItemId);
    setPageNumber(pageitem.number + 1);
    const info = Page_Button_item_info.data.data;
    setTitle(info.title);
    setContent(info.content);
    setPoint(info.point);
    setType(info.type);
    setPointType(info.pointType);
    setLimitTime(info.limitTime);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={Click_Page}
    >
      Page {pageitem.number + 1}
    </Button>
  );
};

export default Page_Button_item;
