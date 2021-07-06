import { useState } from "react";

import authService from "../services/auth.service";
import carsService from "../services/cars.service";

import logo from "../assets/logo.png";
import car from "../assets/car.png";
import bike from "../assets/bike.png";

import "../styles/Main.scss";
import { useEffect } from "react";

function Main() {
  const [username, setUsername] = useState("");
  const [selectCars, setSelectCars] = useState(true);
  const [selectBikes, setSelectBikes] = useState(true);
  const [vehiclesList, setVehiclesList] = useState([]);

  const logout = () => {
    authService.logout();
    return window.location.reload();
  };

  const switchVehicles = (vehicle: string) => {
    if (vehicle === "cars" && selectCars && selectBikes) {
      return setSelectCars(false);
    }

    if (vehicle === "cars" && !selectCars && selectBikes) {
      return setSelectCars(true);
    }

    if (vehicle === "bikes" && selectCars && selectBikes) {
      return setSelectBikes(false);
    }

    if (vehicle === "bikes" && selectCars && !selectBikes) {
      return setSelectBikes(true);
    }

    return;
  };

  useEffect(() => {
    carsService
      .getCars()
      .then((response) => {
        console.log(response.data);
        return setVehiclesList(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-container">
      <img src={logo} alt="small logo" className="logo-small" />
      <h1 id="small-title">RateIT</h1>
      <button id="logout-button" onClick={() => logout()}>
        LOG OUT
      </button>
      <p id="username">Hi, {username}!</p>
      <div className="vehicles-selection">
        <img
          src={bike}
          alt="bike logo"
          className="car-bike-img"
          onClick={() => switchVehicles("bikes")}
          style={
            selectBikes
              ? {
                  filter: "contrast(100%)",
                }
              : {
                  filter: "contrast(50%)",
                }
          }
        />
        <img
          src={car}
          alt="car logo"
          className="car-bike-img"
          onClick={() => switchVehicles("cars")}
          style={
            selectCars
              ? {
                  filter: "contrast(100%)",
                }
              : {
                  filter: "contrast(50%)",
                }
          }
        />
      </div>
      <input className="search-bar" type="text" placeholder="Search" />
      <select
        name="sortBy"
        className="sortList"
        //onChange={(event) => //setSort(event.target.value)}
        value="sort"
      >
        <option value="">Sort by</option>
        <option value="nameDes">Name ▼</option>
        <option value="nameAsc">Name ▲</option>
        <option value="modelsDes">Models ▼</option>
        <option value="modelsAsc">Models ▲</option>
        <option value="reviewsDes">All Reviews ▼</option>
        <option value="reviewsAsc">All Reviews ▲</option>
      </select>
      <div className="makes-list">
        {vehiclesList.map((vehicle, index) => {
          const { make } = vehicle;
          const { models } = vehicle;
          return (
            <div key={index}>
              <p>{make}</p>
              <p>Models:</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
