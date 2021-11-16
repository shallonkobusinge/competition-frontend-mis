import './App.css';
import React from "react";
import Login from './views/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import SchoolEntry from './views/SchoolEntry'
import StudentReportInfo from './components/StudentReportInfo';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

function PublicRoute({ children, ...rest }) {
  if (!sessionStorage.getItem("token")) {
    localStorage.removeItem("user");
  }
  return (
    <Route
      {...rest}
      render={() => {
        return !sessionStorage.getItem("token") ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}
function App() {

  return (

    <Router>
      <Switch>


        <PrivateRoute exact path="/">
          <SchoolEntry />
        </PrivateRoute>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute exact path="/student-info">
          <StudentReportInfo />
        </PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
