import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords don't match.");
    }

    AuthService.reset(token, newPassword, confirmPassword).then(
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
    <div className="activateForm">
      <Logo />
      <div className="container">
        <Link className="goBack" to="/forgot">
          ←
        </Link>
        <h1>RESET PASSWORD</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="inputLogin"
            id="mail"
            type="text"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <input
            className="inputLogin"
            id="newPassword"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className="inputLogin"
            id="confirmPassword"
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

export default ResetPassword;
