import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import authService from "../services/auth.service";
import bikesService from "../services/bikes.service";

import logo from "../assets/logo.png";
import bike from "../assets/bike.png";

interface Review {
  _id: string;
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
}

function BikeReviews() {
  const [username, setUsername] = useState("");
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [filteredReviewsList, setFilteredReviewsList] = useState<Review[]>([]);
  const [reviews, setReviews] = useState<Review[]>([...reviewsList]);
  const { make } = useParams<Params>();
  const { model } = useParams<Params>();

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

  const handleChange = (event: any) => {
    if (!event.target.value.length) {
      setFilteredReviewsList([]);
    }

    const newReviewsList = reviewsList.filter((review) => {
      const lowerCase = review.Version.toLowerCase();
      const input = event.target.value.toLowerCase();

      return lowerCase.includes(input);
    });

    setFilteredReviewsList([...newReviewsList]);

    return;
  };

  const setSort = (value: string) => {
    return;
  };

  useEffect(() => {
    bikesService
      .getReviews(make, model)
      .then((response) => {
        setReviewsList([...response.data.models[0].reviews]);
      })
      .catch((err) => console.error(err));
  }, [make, model]);

  useEffect(() => {
    const username: any = localStorage.getItem("username");
    JSON.parse(username);
    return setUsername(username);
  }, []);

  useEffect(() => {
    if (filteredReviewsList.length > 0) {
      setReviews([...filteredReviewsList]);
    }
    if (filteredReviewsList.length === 0) {
      setReviews([...reviewsList]);
    }
  }, [reviewsList, filteredReviewsList]);

  return (
    <div className="main-container">
      <img src={logo} alt="small logo" className="logo-small" />
      <h1 id="small-title">Reviews</h1>
      <button id="logout-button" onClick={() => logout()}>
        LOG OUT
      </button>
      <p id="username">Logged as: {username}</p>
      <div className="vehicles-selection">
        <img src={bike} alt="bike logo" className="car-bike-img" />
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
      <Link className="goBack" to={`/bikes/${make}/all`}>
        ←
      </Link>
      <div className="makes-list">
        {reviews.map((review, index) => {
          const tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(review.Date)
          );
          const date = tempDate.split("/").join("-");
          return (
            <div key={index} className="bike-make-bar">
              <Link to={`/bikes/${make}/${model}/${review._id}`}>
                {" "}
                <button className="show-btn">SHOW</button>
              </Link>
              <span>
                <b>
                  {make} {model} {review.Version}
                </b>
              </span>
              <span>Date: {date}</span>
            </div>
          );
        })}
      </div>
      <Link id="link-add-review" to={`/bikes/${make}/${model}/addreview`}>
        <button className="add-review-btn">ADD REVIEW</button>
      </Link>
    </div>
  );
}

export default BikeReviews;
