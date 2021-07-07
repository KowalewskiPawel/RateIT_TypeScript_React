import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import authService from "../services/auth.service";
import carsService from "../services/cars.service";

import car from "../assets/car.png";

import "../styles/CarReview.scss";

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

interface Params {
  make: string;
  model: string;
  id: string;
}

function CarReview() {
  const [username, setUsername] = useState("");
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const { make } = useParams<Params>();
  const { model } = useParams<Params>();
  const { id } = useParams<Params>();

  useEffect(() => {
    carsService
      .getReviews(make, model)
      .then((response) => {
        const singleReview = [...response.data.models[0].reviews].filter(
          (item) => item._id === id
        );
        return setReviewsList([...singleReview]);
      })
      .catch((err) => console.error(err));
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
      <div className="review">
        {reviewsList.map((item, index) => {
          const tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(item.Date)
          );
          const date = tempDate.split("/").join("-");
          return (
            <div key={index}>
              <p>
                <u>Version:</u> {item.Version}
              </p>
              <p>
                <u>Year:</u> {item.Year}
              </p>
              <p>
                <u>Engine:</u> {item.Engine}
              </p>
              <p>
                <u>General:</u> {item.General}
              </p>
              <p>
                <u>Pros:</u> {item.Pros}
              </p>
              <p>
                <u>Cons:</u> {item.Cons}
              </p>
              <p>
                <u>Date:</u> {date}
              </p>
              <p>
                <u>User:</u> {item.User}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarReview;
