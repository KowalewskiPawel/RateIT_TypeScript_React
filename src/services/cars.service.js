import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:5000";

class CarsService {
  getCars() {
    return axios.get(API_URL + "/cars");
  }
}

export default new CarsService();
