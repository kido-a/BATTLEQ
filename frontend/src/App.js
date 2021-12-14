import Home from "./components/home/Home";
import Nav from "./components/header/Nav";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import Forgot from "./components/user/Forgot";
import QuizMake from "./components/quiz/QuizMake";
import QuizTitle from "./components/quiz/QuizTitle";
import QuizGameRoom from "./components/quiz/QuizGameRoom";
import UserProfile from "./components/user/UserProfile";
import { ThemeProvider, StyledEngineProvider } from "@material-ui/core";
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./theme";
import PlayHost from "./components/play/PlayHost";
import PlayUser from "./components/play/PlayUser";
import Context from "./context/Context";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import QuizSearch from "./components/quiz/QuizSearch";

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Context>
          <BrowserRouter>
            <Nav />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login" component={() => <Login />} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/userProfile" component={UserProfile} />
              <Route exact path="/playHost" component={PlayHost} />
              <Route exact path="/playUser" component={PlayUser} />
              <Route exact path="/forgot" component={Forgot} />
              <Route exact path="/profile" component={() => <Profile />} />
              <Route exact path="/quizMake" component={() => <QuizMake />} />
              <Route
                exact
                path="/quizSearch"
                component={() => <QuizSearch />}
              />
              <Route exact path="/quizTitle" component={() => <QuizTitle />} />
              <Route path="/room/:name" component={QuizGameRoom} />
            </Switch>
          </BrowserRouter>
        </Context>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
