import { useState } from "react";
import { Link } from "react-router-dom";

import authService from "../services/auth.service";
import carsService from "../services/cars.service";
import bikesService from "../services/bikes.service";

import logo from "../assets/logo.png";
import car from "../assets/car.png";
import bike from "../assets/bike.png";

import "../styles/Main.scss";
import { useEffect } from "react";

interface Review {
  Version: string;
  Year: number;
  Engine: string;
  General: string;
  Pros: string;
  Cons: string;
  User: string;
  Date: Date;
}

interface Model {
  name: string;
  reviews: Review[];
}

interface Car {
  carId: string;
  make: string;
  models: Model[];
  createdAt: string;
  updatedAt: string;
}

interface Bike {
  bikeId: string;
  make: string;
  models: Model[];
  createdAt: string;
  updatedAt: string;
}

function Main() {
  const [username, setUsername] = useState<string | null>("");
  const [selectCars, setSelectCars] = useState(true);
  const [selectBikes, setSelectBikes] = useState(true);
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [bikesList, setBikesList] = useState<Bike[]>([]);
  const [filteredCarsList, setFilteredCarsList] = useState<Car[]>([]);
  const [filteredBikesList, setFilteredBikesList] = useState<Bike[]>([]);

  const [cars, setCars] = useState<Car[]>([...carsList]);
  const [bikes, setBikes] = useState<Bike[]>([...bikesList]);

  const logout = () => {
    authService.logout();
    return window.location.reload();
  };

  const handleChange = (event: any) => {
    if (!event.target.value.length) {
      setFilteredCarsList([]);
      setFilteredBikesList([]);
    }

    const newCarsList = carsList.filter((car) => {
      const lowerCase = car.make.toLowerCase();
      const input = event.target.value.toLowerCase();

      return lowerCase.includes(input);
    });

    const newBikesList = bikesList.filter((bike) => {
      const lowerCase = bike.make.toLowerCase();
      const input = event.target.value.toLowerCase();

      return lowerCase.includes(input);
    });

    setFilteredCarsList([...newCarsList]);
    setFilteredBikesList([...newBikesList]);

    return;
  };

  const setSort = (value: string) => {
    return;
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
        return setCarsList([...response.data]);
      })
      .catch((err) => console.error(err));

    bikesService
      .getBikes()
      .then((response) => {
        return setBikesList([...response.data]);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const username: any = localStorage.getItem("username");
    JSON.parse(username);
    return setUsername(username);
  }, []);

  useEffect(() => {
    if (filteredCarsList.length > 0) {
      setCars([...filteredCarsList]);
    }
    if (filteredCarsList.length === 0) {
      setCars([...carsList]);
    }

    if (filteredBikesList.length > 0) {
      setBikes([...filteredBikesList]);
    }

    if (filteredBikesList.length === 0) {
      setBikes([...bikesList]);
    }
  }, [filteredBikesList, filteredCarsList, carsList, bikesList]);

  return (
    <div className="main-container">
      <img src={logo} alt="small logo" className="logo-small" />
      <h1 id="small-title">RateIT</h1>
      <button id="logout-button" onClick={() => logout()}>
        LOG OUT
      </button>
      <p id="username">Logged as: {username}</p>
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
      <input
        onChange={(event) => handleChange(event)}
        onKeyUp={(event) => handleChange(event)}
        className="search-bar"
        type="text"
        placeholder="Search"
      />
      <select
        name="sortBy"
        className="sortList"
        onChange={(event) => setSort(event.target.value)}
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
        {selectCars
          ? cars.map((vehicle, index) => {
              let reviewsLength = 0;
              vehicle.models.forEach((model) => {
                reviewsLength += model.reviews.length;
              });
              return (
                <div key={index} className="car-make-bar">
                  <Link to={`/cars/${vehicle.make}/all`}>
                    {" "}
                    <button className="show-btn">SHOW</button>
                  </Link>
                  <img src={car} alt="car-mini-logo" />
                  <span>
                    <b>{vehicle.make}</b>
                  </span>
                  <span>Models: {vehicle.models.length}</span>
                  <span>Reviews: {reviewsLength}</span>
                </div>
              );
            })
          : ""}

        {selectBikes
          ? bikes.map((vehicle, index) => {
              let reviewsLength = 0;
              vehicle.models.forEach((model) => {
                reviewsLength += model.reviews.length;
              });
              return (
                <div key={index} className="bike-make-bar">
                  <Link to={`/bikes/${vehicle.make}/all`}>
                    <button className="show-btn">SHOW</button>
                  </Link>
                  <img src={bike} alt="bike-mini-logo" />
                  <span>
                    <b>{vehicle.make}</b>
                  </span>
                  <span>Models: {vehicle.models.length}</span>
                  <span>Reviews: {reviewsLength}</span>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Main;
