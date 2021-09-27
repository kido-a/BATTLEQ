import Home from "./components/Home/Home";
import Nav from "./components/Header/Nav";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Update from "./components/User/Update";
import Profile from "./components/User/Profile";
import Quiz from "./components/Quiz/Quiz";
import Result from "./components/Quiz/Result";
import Forgot from "./components/User/Forgot";
import Quiz_make from "./components/battle_Quiz/Quiz_make";
import Quiz_title from "./components/battle_Quiz/Quiz_title";
import { UserStateContext } from "./Context/Context";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [profile__img, setProfile__img] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const email = localStorage.getItem("email");

  const headers = {
    accessToken: `${localStorage.getItem("accessToken")}`,
    "Access-Control-Allow-Origin": "*",
  };

  useEffect(() => {
    const headers = {
      accessToken: `${localStorage.getItem("accessToken")}`,
      "Access-Control-Allow-Origin": "*",
    };
    (async () => {
      await axios
        .get(`/member/detail/${email}`, {
          headers,
        })

        .then(
          (res) => {
            const datauser = res.data.data;
            setUser(datauser);
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
    <UserStateContext.Provider
      value={{
        user,
        setUser,
        name,
        setName,
        profile__img,
        setProfile__img,
      }}
    >
      <BrowserRouter>
        <div className="App">
          {/* <Header /> */}

          {/* <Nav /> */}
          <Nav user={user} setUsers={setUsers} />
          {/* <Nav user={user} getUser={getUser} /> */}
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                {/* <Route
                exact
                path="/"
                component={() => (
                  <Home
                    user={user}
                    name={name}
                    setName={setName}
                    fetchQuestions={fetchQuestions}
                  />
                )}
              /> */}
                <Route exact path="/">
                  <Home
                    user={user}
                    name={name}
                    setName={setName}
                    fetchQuestions={fetchQuestions}
                  />
                </Route>
                <Route
                  exact
                  path="/login"
                  component={() => <Login setUsers={setUsers} user={user} />}
                />
                {/* <Login /> */}
                {/* <Login getUser={getUser} /> */}
                {/* component={() => <Login getUser={getUser} user={user} />} */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot" component={Forgot} />
                <Route
                  exact
                  path="/Profile"
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

                <Route exact path="/quiz_make" component={Quiz_make} />
                <Route exact path="/quiz_title" component={Quiz_title} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </UserStateContext.Provider>
  );
}
