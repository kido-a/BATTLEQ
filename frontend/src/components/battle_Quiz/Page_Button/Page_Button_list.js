import React, { useState } from "react";
import Page_Button_item from "./Page_Button_item";
const Page_Button_list = ({
  pagebutton,
  setPagebutton,
  quizitem_arr,
  setQuizitem_arr,
  setContent,
  setTitle,
  setPoint,
  setType,
  setLimitTime,
  setPointType,
  setPage_button_quizItemId,
}) => {
  const [pageNumber, setPageNumber] = useState("");
  if (pageNumber) {
    return (
      <div>
        <div>현재는 {pageNumber}번 페이지</div>
        <ul>
          <div className="pagebuttoncolor">
            {pagebutton &&
              pagebutton.map((pageitem) => {
                return (
                  <Page_Button_item
                    key={pageitem.id}
                    pagebutton={pagebutton}
                    pageitem={pageitem}
                    setPagebutton={setPagebutton}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setQuizitem_arr={setQuizitem_arr}
                    setTitle={setTitle}
                    setContent={setContent}
                    setPoint={setPoint}
                    setType={setType}
                    setLimitTime={setLimitTime}
                    setPointType={setPointType}
                    setPage_button_quizItemId={setPage_button_quizItemId}
                  />
                );
              })}
          </div>
        </ul>
      </div>
    );
  }
};

export default Page_Button_list;
