import React, { useContext } from "react";
import ButtonNumberItem from "./ButtonNumberItem";
import { UserStateContext } from "../../../context/Context";
const ButtonNumberList = () => {
  const { quizItemPage, quizItemPageNumber } = useContext(UserStateContext);
  // console.log("quizItemPage : ", quizItemPage);
  // console.log("quizItemPageNumber : ", quizItemPageNumber);
  if (quizItemPage) {
    return (
      <div>
        <div>현재는 {quizItemPageNumber}번 페이지</div>
        <ul>
          <div className="pagebuttoncolor">
            {quizItemPage &&
              quizItemPage.map((pageitem) => {
                return (
                  <ButtonNumberItem key={pageitem.id} pageitem={pageitem} />
                );
              })}
          </div>
        </ul>
      </div>
    );
  } else return <div>{"  "}</div>;
};

export default ButtonNumberList;
