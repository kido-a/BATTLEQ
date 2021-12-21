import { React, createContext, useState } from "react";

export const UserStateContext = createContext("");

function Context(props) {
  const [successed, setSuccessed] = useState(false);
  const [quizId, setQuizId] = useState(0);
  const [ownerId, setOwnerId] = useState(0);
  const [quizItemId, setQuizItemId] = useState(0);
  const [quizItemCount, setQuizItemCount] = useState(0);
  const [quizItemPage, setQuizItemPage] = useState([]);
  const [quizItemPageId, setQuizItemPageId] = useState(0);
  const [quizItemPageNumber, setQuizItemPageNumber] = useState(0);
  const [quizSearch, setQuizSearch] = useState([]);
  const [quizSearchFilter, setQuizSearchFilter] = useState("");

  const [chatMessages, setChatMessages] = useState([]);

  const [users, setUsers] = useState({
    email: "",
    pwd: "",
    nickname: "",
    userName: "",
    authority: "ROLE_ADMIN",
    userInfo: "테스트 유저입니다.",
  });

  const [quizData, setQuizData] = useState({
    name: "",
    introduction: "",
    category: "",
    ownerId: 1,
    thumbnail:
      "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
  });

  const [quizItemData, setQuizItemData] = useState({
    title: "",
    content: "",
    image:
      "http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
    limitTime: "",
    ownerId: 1,
    pointType: "",
    point: "",
    quizId: "",
    type: "",
  });

  const resetUser = () => {
    setUsers({ ...users, email: "", pwd: "", nickname: "", userName: "" });
  };

  const resetQuizItem = () => {
    setQuizItemData({
      ...quizItemData,
      title: "",
      content: "",
      pointType: "",
      point: "",
      limitTime: "",
      type: "",
    });
  };

  const resetQuiz = () => {
    setQuizData({
      ...quizData,
      name: "",
      introduction: "",
      category: "",
    });
  };

  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
    setQuizData({
      ...quizData,
      [event.target.name]: event.target.value,
    });
    setQuizItemData({
      ...quizItemData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <UserStateContext.Provider
      value={{
        users,
        handleChange,
        setUsers,
        resetUser,
        successed,
        setSuccessed,
        quizData,
        setQuizData,
        quizId,
        setQuizId,
        ownerId,
        setOwnerId,
        quizItemData,
        setQuizItemData,
        resetQuizItem,
        setQuizItemId,
        setQuizItemCount,
        quizItemId,
        quizItemCount,
        quizItemPage,
        setQuizItemPage,
        quizItemPageId,
        setQuizItemPageId,
        quizItemPageNumber,
        setQuizItemPageNumber,
        resetQuiz,
        quizSearch,
        setQuizSearch,
        quizSearchFilter,
        setQuizSearchFilter,
        chatMessages,
        setChatMessages,
      }}
    >
      {props.children}
    </UserStateContext.Provider>
  );
}

export default Context;
