import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Register</h1>
      </div>
      <div className="form-center">
        <div className="form-container">
          <h1>Register for RoundTrip</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              props.onRegister(email, password, firstName, lastName);
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <input type="password" placeholder="Confirm Password" name="password_confirm" />

            <button type="submit">SUBMIT</button>
          </form>
          <footer>Already signed up? Click <Link to="/login">here</Link> to login.</footer>
        </div>
      </div>
    </div>
  );
}
