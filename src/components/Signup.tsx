import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

import "../styles/Signup.scss";

function Signup() {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }

    AuthService.signup(username, mail, password, confirmPassword).then(
      (response: any) => {
        return setMessage(response.message);
      },
      (err: any) => {
        console.error(err);
        return setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="signupForm">
      <Logo />
      <div className="container">
        <Link className="goBack" to="/login">
          ←
        </Link>
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputLogin"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            maxLength={10}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="inputLogin"
            id="mail"
            type="text"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
          <input
            className="inputLogin"
            id="pass"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="inputLogin"
            id="confirmPass"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <input
            className="formButton"
            id="submitBtn"
            type="submit"
            value="SUBMIT"
          />
        </form>

        {message ? <p className="warningMessage">{message}</p> : ""}
      </div>
    </div>
  );
}

export default Signup;
