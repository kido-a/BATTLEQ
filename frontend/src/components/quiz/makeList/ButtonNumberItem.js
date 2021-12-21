import React, { useContext } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { UserStateContext } from "../../../context/Context";

const ButtonNumberItem = ({ pageitem }) => {
  const {
    setQuizItemPageId,
    setQuizItemPageNumber,
    quizItemData,
    setQuizItemData,
  } = useContext(UserStateContext);
  //   console.log("아이템 번호 : ", pageitem.number);

  const Click_Page = async () => {
    const quizItemPageInfo = await axios
      .get(`/api/v1/quizItem/${pageitem.quizItemId}`)
      // .get(`http://3.37.99.78:8080/api/v1/quizItem/${pageitem.quizItemId}`)

      .catch((err) => {
        console.log(err);
      });
    setQuizItemPageId(pageitem.quizItemId);
    setQuizItemPageNumber(pageitem.number + 1);
    const info = quizItemPageInfo.data.data;
    setQuizItemData({
      ...quizItemData,
      title: info.title,
      content: info.content,
      point: info.point,
      type: info.type,
      pointType: info.pointType,
      limitTime: info.limitTime,
    });
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

export default ButtonNumberItem;
