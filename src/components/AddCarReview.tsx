import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDebouncedCallback } from "use-debounce";

import carsService from "../services/cars.service";

import car from "../assets/car.png";

import "../styles/AddCarReview.scss";

interface Params {
  make: string;
  model: string;
  id: string;
}

function AddCarReview() {
  const [username, setUsername] = useState("");
  const [version, setVersion] = useState<string>("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [general, setGeneral] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");

  const history = createBrowserHistory();

  const { make } = useParams<Params>();
  const { model } = useParams<Params>();

  const addReview = (event: any) => {
    event.preventDefault();

    return carsService
      .postReview(
        version,
        year,
        engine,
        general,
        pros,
        cons,
        username,
        make,
        model
      )
      .then((response) => {
        history.push(`/cars/${make}/${model}`);
        return window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const username: any = localStorage.getItem("username");
    JSON.parse(username);
    return setUsername(username);
  }, []);

  return (
    <div className="review-container">
      <img src={car} alt="small logo" />
      <h1>
        {make} {model}
      </h1>
      <Link className="goBack" to={`/cars/${make}/${model}`}>
        ←
      </Link>

      <div className="add-review">
        <form onSubmit={useDebouncedCallback(addReview, 400)}>
          <button className="add-review-btn">SUBMIT REVIEW</button>
          <p>
            <u>Version:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={version}
            maxLength={20}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
          <p>
            <u>Year:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={year}
            maxLength={10}
            onChange={(e) => setYear(e.target.value)}
            required
          />
          <p>
            <u>Engine:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={engine}
            maxLength={20}
            onChange={(e) => setEngine(e.target.value)}
            required
          />
          <p>
            <u>General:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={general}
            maxLength={150}
            onChange={(e) => setGeneral(e.target.value)}
            required
          />
          <p>
            <u>Pros:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={pros}
            maxLength={150}
            onChange={(e) => setPros(e.target.value)}
            required
          />
          <p>
            <u>Cons:</u>
          </p>
          <input
            className="input-text"
            type="text"
            value={cons}
            maxLength={150}
            onChange={(e) => setCons(e.target.value)}
            required
          />
        </form>
      </div>
    </div>
  );
}

export default AddCarReview;
