import Logo from "./Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthService from "../services/auth.service.js";

import loading from "../assets/loading.gif";

function Activate() {
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    AuthService.activate(mail, code).then(
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
            <Link className="goBack" to="/login">
              ←
            </Link>
            <h1>ACTIVATE ACCOUNT</h1>
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
                className="inputLogin"
                id="code"
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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

export default Activate;
