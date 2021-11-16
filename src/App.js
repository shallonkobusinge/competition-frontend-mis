import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import Login from './views/Login'

// import UsersPage from './views/usersPage';

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
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
}
function App() {

  return (
    <>
      <h2 >Hello World</h2>
    </>
    // <Router>
    //   <Switch>
    //     <PrivateRoute exact path="/users" >
    //       <UsersPage />
    //     </PrivateRoute>

    //     <PublicRoute exact path="/login">
    //       <Login />
    //     </PublicRoute>
    //   </Switch>
    // </Router>
  );
}

export default App;
