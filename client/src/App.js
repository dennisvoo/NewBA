import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import HomePage from "./components/HomePage";
import Standings from "./components/Standings";
import Teams from "./components/Teams";
import BoxScore from "./components/BoxScore";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Preferences from "./components/auth/Preferences";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/standings" component={Standings} />
              <Route path="/teams" component={Teams} />
              <Route path="/boxscore" component={BoxScore} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/preferences" component={Preferences} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
