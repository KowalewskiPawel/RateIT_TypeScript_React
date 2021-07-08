import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import authService from "../services/auth.service";
import bikesService from "../services/bikes.service";

import logo from "../assets/logo.png";
import bike from "../assets/bike.png";

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

interface Params {
  make: string;
}

function BikeMake() {
  const [username, setUsername] = useState("");
  const [modelsList, setModelsList] = useState<Model[]>([]);
  const { make } = useParams<Params>();
  const history = createBrowserHistory();

  const logout = async () => {
    try {
      authService.logout();
      history.push("/");
      return window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    bikesService
      .getModels(make)
      .then((response) => {
        setModelsList([...response.data.models]);
      })
      .catch((err) => console.error(err));
  }, [make]);

  useEffect(() => {
    const username: any = localStorage.getItem("username");
    JSON.parse(username);
    return setUsername(username);
  }, []);

  return (
    <div className="main-container">
      <img src={logo} alt="small logo" className="logo-small" />
      <h1 id="small-title">{make}</h1>
      <button id="logout-button" onClick={() => logout()}>
        LOG OUT
      </button>
      <p id="username">Logged as: {username}</p>
      <div className="vehicles-selection">
        <img src={bike} alt="bike logo" className="car-bike-img" />
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
      <Link className="goBack" to="/">
        ←
      </Link>
      <div className="makes-list">
        {modelsList.map((vehicle, index) => {
          return (
            <div key={index} className="bike-make-bar">
              <Link to={`/bikes/${make}/${vehicle.name}`}>
                {" "}
                <button className="show-btn">SHOW</button>
              </Link>
              <img src={bike} alt="bike-mini-logo" />
              <span>
                <b>{vehicle.name}</b>
              </span>
              <span>Reviews: {vehicle.reviews.length}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BikeMake;
