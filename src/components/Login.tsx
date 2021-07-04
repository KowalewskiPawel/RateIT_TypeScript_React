import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    AuthService.login(mail, password).then(
      (response: any) => {
        window.location.reload();
      },
      (err: any) => {
        console.error(err);
        setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="loginForm">
      <Logo />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="user"
          type="text"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <input
          id="pass"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input id="submitBtn" type="submit" value="Submit" />
      </form>
      <p>or</p>

      {message ? <p>{message}</p> : ""}
    </div>
  );
}

export default Login;
