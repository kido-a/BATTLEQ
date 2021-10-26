import Home from "./components/Home/Home";
import Nav from "./components/Header/Nav";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Update from "./components/User/Update";
import Profile from "./components/User/Profile";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Quiz/Result";
import Forgot from "./components/User/Forgot";
import Quiz_setting from "./components/Quiz/Quiz_setting";
import Quiz_make from "./components/battle_Quiz/Quiz_make";
import Quiz_title from "./components/battle_Quiz/Quiz_title";
import Quiz_game_room from "./components/battle_Quiz/Quiz_game_room";
import { ThemeProvider, StyledEngineProvider } from "@material-ui/core";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./theme";

import { UserStateContext } from "./Context/Context";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz_search from "./components/battle_Quiz/Quiz_search";

export default function App() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [profile__img, setProfile__img] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [quizId, setQuizId] = useState(0);
  const [ownerId, setOwnerId] = useState(0);
  const email = localStorage.getItem("email");
  const headers = {
    accessToken: `${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(() => {
    (async () => {
      await axios

        .get(`/member/detail/${email}`, {
          headers,
        })

        .then(
          (res) => {
            const datauser = res.data.data;
            setUsers(datauser);
          },
          (err) => {
            console.log(err);
          }
        );
    })();
  }, []);

  const setUsers = (user) => {
    setUser(user);
  };

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10& category = ${category}& difficulty = ${difficulty}&type = multiple`
    );
    setQuestions(data.results);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <UserStateContext.Provider
          value={{
            user,
            setUser,
            name,
            setName,
            profile__img,
            setProfile__img,
            quizId,
            setQuizId,
          }}
        >
          <BrowserRouter>
            <Nav user={user} setUsers={setUsers} />

            <Switch>
              <Route exact path="/">
                <Home user={user} />
              </Route>
              <Route
                exact
                path="/login"
                component={() => <Login setUsers={setUsers} />}
              />

              <Route exact path="/register" component={Register} />
              <Route exact path="/forgot" component={Forgot} />
              <Route
                exact
                path="/profile"
                component={() => <Profile user={user} />}
              />
              <Route
                exact
                path="/Update"
                component={() => <Update user={user} />}
              />
              <Route path="/quiz" exact>
                <Quiz
                  name={name}
                  questions={questions}
                  score={score}
                  setScore={setScore}
                  setQuestions={setQuestions}
                />
              </Route>
              <Route path="/result" exact>
                <Result name={name} score={score} />
              </Route>

              <Route
                exact
                path="/quiz_make"
                component={() => (
                  <Quiz_make quizId={quizId} ownerId={ownerId} />
                )}
              />

              <Route
                exact
                path="/quiz_search"
                component={() => (
                  <Quiz_search quizId={quizId} ownerId={ownerId} />
                )}
              />
              <Route
                exact
                path="/quiz_title"
                component={() => (
                  <Quiz_title setQuizId={setQuizId} setOwnerId={setOwnerId} />
                )}
              />
              <Route path="/room/:name" component={Quiz_game_room} />
              <Route exact path="/quiz_setting">
                <Quiz_setting
                  user={user}
                  name={name}
                  setName={setName}
                  fetchQuestions={fetchQuestions}
                />
              </Route>
            </Switch>
          </BrowserRouter>
        </UserStateContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
