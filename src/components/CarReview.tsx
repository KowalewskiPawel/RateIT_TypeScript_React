import { useState, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

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
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");

  const version: any = useRef();
  const year: any = useRef();
  const engine: any = useRef();
  const general: any = useRef();
  const pros: any = useRef();
  const cons: any = useRef();

  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const { make } = useParams<Params>();
  const { model } = useParams<Params>();
  const { id } = useParams<Params>();

  const history = createBrowserHistory();

  const deleteReview = () => {
    carsService
      .deleteReview(make, model, id)
      .then((response) => {
        history.push(`/cars/${make}/${model}`);
        return window.location.reload();
      })
      .catch((err) => console.error(err));
  };

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
      <div className="review">
        {reviewsList.map((item, index) => {
          const tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(item.Date)
          );
          const date = tempDate.split("/").join("-");
          return (
            <div key={index}>
              <div>
                {item.User === username ? (
                  <>
                    <button
                      onClick={() => deleteReview()}
                      className="delete-review-btn"
                    >
                      DELETE REVIEW
                    </button>
                    <button
                      onClick={() => setEdit((prevState) => !prevState)}
                      className="edit-review-btn"
                    >
                      {!edit ? "EDIT REVIEW" : "CANCEL EDIT"}
                    </button>
                    {edit ? <button>SUBMIT</button> : ""}
                  </>
                ) : (
                  ""
                )}
              </div>
              <p>
                <u>Version:</u>{" "}
                <p ref={version} contentEditable={edit}>
                  {item.Version}
                </p>
              </p>
              <p>
                <u>Year:</u>{" "}
                <p ref={year} contentEditable={edit}>
                  {item.Year}
                </p>
              </p>
              <p>
                <u>Engine:</u>{" "}
                <p ref={engine} contentEditable={edit}>
                  {item.Engine}
                </p>
              </p>
              <p>
                <u>General:</u>{" "}
                <p ref={general} contentEditable={edit}>
                  {item.General}
                </p>
              </p>
              <p>
                <u>Pros:</u>{" "}
                <p ref={pros} contentEditable={edit}>
                  {item.Pros}
                </p>
              </p>
              <p>
                <u>Cons:</u>{" "}
                <p ref={cons} contentEditable={edit}>
                  {item.Cons}
                </p>
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
