import { useState } from "react";
import { useParams } from "react-router";

import authService from "../services/auth.service";
import carsService from "../services/cars.service";

import car from "../assets/car.png";

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
      <div>
        {reviewsList.map((item, index) => {
          const tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(item.Date)
          );
          const date = tempDate.split("/").join("-");
          return (
            <div key={index}>
              <p>Version: {item.Version}</p>
              <p>Year: {item.Year}</p>
              <p>Engine: {item.Engine}</p>
              <p>General: {item.General}</p>
              <p>Pros: {item.Pros}</p>
              <p>Cons: {item.Cons}</p>
              <p>Date: {date}</p>
              <p>User: {item.User}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarReview;
