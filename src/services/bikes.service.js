import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000";

class BikesService {
  getBikes() {
    return axios.get(API_URL + "/bikes");
  }
}

export default new BikesService();
