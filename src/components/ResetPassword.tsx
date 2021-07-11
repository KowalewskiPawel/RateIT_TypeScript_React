import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

import loading from "../assets/loading.gif";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return setMessage("Passwords don't match.");
    }

    AuthService.reset(token, newPassword, confirmPassword).then(
      (response: any) => {
        setIsLoading(false);
        return setMessage(response.message);
      },
      (err: any) => {
        setIsLoading(false);
        console.error(err);
        return setMessage("Wrong credentials or network problems.");
      }
    );
  };

  return (
    <div className="activateForm">
      <Logo />
      <div className="container">
        {isLoading ? (
          <>
            <h1>Loading</h1>
            <img className="loading" src={loading} alt="loading" />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
