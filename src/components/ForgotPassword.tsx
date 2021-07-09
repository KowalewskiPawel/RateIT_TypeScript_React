import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useDebouncedCallback } from "use-debounce";

import AuthService from "../services/auth.service.js";

function ForgotPassword() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    AuthService.forgot(mail).then(
      (response: any) => {
        return setMessage(response.message);
      },
      (err: any) => {
        console.error(err);
        setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="activateForm">
      <Logo />
      <div className="container">
        <Link className="goBack" to="/login">
          ←
        </Link>
        <h1>FORGOT PASSWORD</h1>
        <form onSubmit={useDebouncedCallback(handleSubmit, 400)}>
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
            className="formButton"
            id="submitBtn"
            type="submit"
            value="SUBMIT"
          />
        </form>
        <h2>AND</h2>
        <Link to="/reset">
          <button className="formButton" id="resetPasswordBtn">
            RESET PASSWORD
          </button>
        </Link>

        {message ? <p className="warningMessage">{message}</p> : ""}
      </div>
    </div>
  );
}

export default ForgotPassword;
