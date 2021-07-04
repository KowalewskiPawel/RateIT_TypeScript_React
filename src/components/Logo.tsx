import logo from "../assets/logo.png";

import "../styles/Logo.scss";

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="RateIT logo" />
      <section id="text">
        <p>RateIT after you sell IT</p>
        <p>CheckIT before you buy IT</p>
      </section>
    </div>
  );
}

export default Logo;
