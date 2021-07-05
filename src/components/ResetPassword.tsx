import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

function ResetPassword() {
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    /*
    AuthService.signup(mail, password).then(
      (response: any) => {
        window.location.reload();
      },
      (err: any) => {
        console.error(err);
        setMessage("Wrong credentials or network problems.");
      }
    );
    */
  };

  return (
    <div className="activateForm">
      <Logo />
      <div className="container">
        <Link className="goBack" to="/login">
          ←
        </Link>
        <h1>FORGOT PASSWORD</h1>
        <form onSubmit={handleSubmit}>
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

        {message ? <p>{message}</p> : ""}
      </div>
    </div>
  );
}

export default ResetPassword;
