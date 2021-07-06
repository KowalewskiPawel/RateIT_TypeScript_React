import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000" || process.env.REACT_APP_API_URL_AUTH;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/users/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.accessToken)
          );
          return;
        }
      });
  }

  signup(username, email, password, confirmPassword) {
    return axios.post(API_URL + "/users/signup", {
      username,
      email,
      password,
      confirmPassword,
    });
  }

  activate(email, code) {
    return axios.patch(API_URL + "/users/activate", {
      email,
      code,
    });
  }

  forgot(email) {
    return axios.patch(API_URL + "/users/forgot", {
      email,
    });
  }

  reset(token, newPassword, confirmPassword) {
    return axios.patch(API_URL + "/users/reset", {
      token,
      newPassword,
      confirmPassword,
    });
  }

  logout() {
    localStorage.removeItem("user");

    return axios.get(API_URL + "/users/logout", {
      headers: authHeader(),
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
