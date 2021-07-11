import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

import loading from "../assets/loading.gif";

import "../styles/Login.scss";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    AuthService.login(mail, password).then(
      (response: any) => {
        setIsLoading(false);
        return window.location.reload();
      },
      (err: any) => {
        setIsLoading(false);
        console.error(err);
        return setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="loginForm">
      <Logo />
      <div className="container">
        {isLoading ? (
          <>
            <h1>Loading</h1>
            <img className="loading" src={loading} alt="loading" />
          </>
        ) : (
          <>
            <h1>LOG IN</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="inputLogin"
                id="mail"
                type="text"
                placeholder="Username or Email"
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
                className="formButton"
                id="submitBtn"
                type="submit"
                value="SUBMIT"
              />
            </form>
            <h2>OR</h2>
            <Link to="/signup">
              <button className="formButton" id="createAccountBtn">
                CREATE NEW ACCOUNT
              </button>
            </Link>
            <Link to="/activate">
              <button className="formButton" id="activateAccountBtn">
                ACTIVATE ACCOUNT
              </button>
            </Link>
            <Link to="/forgot">
              <button className="formButton" id="resetPasswordBtn">
                FORGOT PASSWORD
              </button>
            </Link>

            {message ? <p className="warningMessage">{message}</p> : ""}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
