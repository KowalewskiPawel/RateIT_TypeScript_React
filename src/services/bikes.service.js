import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000";

class BikesService {
  getBikes() {
    return axios.get(API_URL + "/bikes");
  }

  getModels(make) {
    return axios.get(`${API_URL}/bikes/${make}/all`);
  }

  getReviews(make, model) {
    return axios.get(`${API_URL}/bikes/${make}/${model}`);
  }
}

export default new BikesService();
