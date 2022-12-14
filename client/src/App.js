import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

//Components
import NavBar from "./components/NavBar";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rides from "./pages/Rides";
import Trips from "./pages/Trips";
import Profile from "./pages/Profile";

//Styles
import "./styles/app.scss";
import "./styles/forms.scss"

export default function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(token);

  function onLogin(email, password) {
    return axios({
      method: "post",
      url: "/api/login",
      data: {
        user: {
          email: email,
          password: password,
        },
      },
    }).then((response) => {
      console.log("response", response.data);
      const user = response.data
      if (response.data.status !== 401) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user_id", user.user_id);
      }
      return user;
    });
  }

  function onRegister(email, password, firstName, lastName) {
    return axios({
      method: "post",
      url: "/api/register",
      data: {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        },
      },
    }).then((response) => {
      const user = response.data
      if (response.data.status !== 401) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user_id", user.user_id);
      }
      return user;
    });
  }

  function loginCheck(email, password) {
    if (!email) {
      alert("Please enter valid email.")
      return;
    }
    if (!password) {
      alert("Please enter your password.")
      return;
    }
    onLogin(email, password).then((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }

  function registerCheck(email, password, firstName, lastName) {
    if (!email || !password || !firstName || !lastName) {
      alert("Please fill in all fields to register.")
      return;
    }
    onRegister(email, password, firstName, lastName).then((user) => {
      setUser(user);
    });
  }

  function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUser("");
  }

  return (
    <main>
      <NavBar user={user} logout={logoutUser}/>
      <Route exact path="/" name="Home">
        <Home />
      </Route>
      <Route exact path="/login" name="Login">
        {user ? <Redirect to="/rides" /> : <Login onLogin={loginCheck} />}
      </Route>
      <Route exact path="/register" name="Register">
        {user ? <Redirect to="/rides" /> : <Register onRegister={registerCheck} />}
      </Route>
      <Route exact path="/rides" name="Rides">
        <Rides />
      </Route>
      <Route exact path="/trips" name="Trips">
        {!user ? <Redirect to="/" /> : <Trips />}
      </Route>
      <Route exact path="/profile" name="Profile">
        {!user ? <Redirect to="/" /> : <Profile />}
      </Route>
    </main>
  );
}
