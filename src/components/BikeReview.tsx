import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import bikesService from "../services/cars.service";

import bike from "../assets/bike.png";

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

function BikeReview() {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState("");

  const versionRef: any = useRef();
  const yearRef: any = useRef();
  const engineRef: any = useRef();
  const generalRef: any = useRef();
  const prosRef: any = useRef();
  const consRef: any = useRef();

  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const { make } = useParams<Params>();
  const { model } = useParams<Params>();
  const { id } = useParams<Params>();

  const history = createBrowserHistory();

  const deleteReview = () => {
    bikesService
      .deleteReview(make, model, id)
      .then((response) => {
        history.push(`/bikes/${make}/${model}`);
        return window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const editReview = () => {
    const version = versionRef.current.innerText;
    const year = yearRef.current.innerText;
    const engine = engineRef.current.innerText;
    const general = generalRef.current.innerText;
    const pros = prosRef.current.innerText;
    const cons = consRef.current.innerText;

    if (!version || !year || !engine || !general || !pros || !cons) {
      return;
    }

    return bikesService
      .editReview(
        version,
        year,
        engine,
        general,
        pros,
        cons,
        username,
        make,
        model,
        id
      )
      .then((response) => {
        return window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    bikesService
      .getReviews(make, model)
      .then((response) => {
        const singleReview = [...response.data.models[0].reviews].filter(
          (item) => item._id === id
        );
        return setReviewsList([...singleReview]);
      })
      .catch((err) => console.error(err));
  }, [id, make, model]);

  useEffect(() => {
    const username: any = localStorage.getItem("username");
    JSON.parse(username);
    return setUsername(username);
  }, []);

  return (
    <div className="review-container">
      <img src={bike} alt="small logo" />
      <h1>
        {make} {model}
      </h1>
      <Link className="goBack" to={`/bikes/${make}/${model}`}>
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
                    {edit ? (
                      <button
                        onClick={() => editReview()}
                        className="submit-review-btn"
                      >
                        SUBMIT
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              <p>
                <u>Version:</u>{" "}
                <p ref={versionRef} contentEditable={edit}>
                  {item.Version}
                </p>
              </p>
              <p>
                <u>Year:</u>{" "}
                <p ref={yearRef} contentEditable={edit}>
                  {item.Year}
                </p>
              </p>
              <p>
                <u>Engine:</u>{" "}
                <p ref={engineRef} contentEditable={edit}>
                  {item.Engine}
                </p>
              </p>
              <p>
                <u>General:</u>{" "}
                <p ref={generalRef} contentEditable={edit}>
                  {item.General}
                </p>
              </p>
              <p>
                <u>Pros:</u>{" "}
                <p ref={prosRef} contentEditable={edit}>
                  {item.Pros}
                </p>
              </p>
              <p>
                <u>Cons:</u>{" "}
                <p ref={consRef} contentEditable={edit}>
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

export default BikeReview;
