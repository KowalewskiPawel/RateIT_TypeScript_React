import axios from "axios";

const API_URL = "http://localhost:5000" || process.env.REACT_APP_API_URL_AUTH;

class AuthService {
  login(identifier, password) {
    return axios
      .post(API_URL, {
        identifier,
        password,
      })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data.jwt));
          return;
        }
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
