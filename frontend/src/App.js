import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./user/Login";
import LoginForm from "./user/LoginForm";
import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/loginForm" component={LoginForm} />
      </switch>
    </Router>
  );
}

export default App;
