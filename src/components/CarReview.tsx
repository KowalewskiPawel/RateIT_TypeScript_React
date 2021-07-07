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
        setReviewsList([...singleReview]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main-container">
      <img src={car} alt="small logo" className="logo-small" />
      <h1 id="small-title">
        {make} {model}
      </h1>
    </div>
  );
}

export default CarReview;
