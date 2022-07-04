import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Tablepatient from "./pages/Tablepatient";
import Profile from "./pages/Profile";
import add_file from "./pages/add_file";
import SignUp from "./pages/SignUp";

import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useEffect, useState } from "react";
import RestPassword from "./pages/RestPassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route exact path="/profile/ressetpass/:id/:token" component={RestPassword} />

        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/Tablepatient" component={Tablepatient} />
          <Route exact path="/profile" component={Profile} />

          <Route exact path="/add_file" component={add_file} />
   
          <Redirect from="*" to="/dashboard" />
          {!JSON.parse(localStorage.getItem("user")) ? (
            <Redirect to="/sign-in" />
          ) : (
            <Redirect to="/dashboard" />
          )}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
