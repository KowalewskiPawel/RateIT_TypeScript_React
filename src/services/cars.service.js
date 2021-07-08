import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000";

class CarsService {
  getCars() {
    return axios.get(API_URL + "/cars");
  }

  getModels(make) {
    return axios.get(`${API_URL}/cars/${make}/all`);
  }

  getReviews(make, model) {
    return axios.get(`${API_URL}/cars/${make}/${model}`);
  }

  postReview(Version, Year, Engine, General, Pros, Cons, User, make, model) {
    return axios.post(
      `${API_URL}/cars/${make}/${model}`,
      {
        headers: authHeader(),
      },
      {
        Version,
        Year,
        Engine,
        General,
        Pros,
        Cons,
        User,
      }
    );
  }
}

export default new CarsService();
