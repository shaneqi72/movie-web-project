import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../Config";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const fetchTopRatedMovies = () => {
    fetch(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=2`
    )
      .then((res) => res.json())
      .then((data) => setTopRatedMovies(data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <div className="col-sm-12" style={{ backgroundColor: "red" }}>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
          ></li>
        </ol>
        <div class="carousel-inner">
          {topRatedMovies.slice(0, 5).map((movie, index) => {
            return (
              <div
                class={`carousel-item ${index === 0 ? "active" : ""}`}
                key={index}
              >
                <img
                  alt="poster"
                  src={
                    movie.backdrop_path &&
                    `${IMAGE_URL}1280${movie.backdrop_path}`
                  }
                  class="d-block w-100 slider"
                />
              </div>
            );
          })}
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </a>
      </div>
    </div>
  );
};

export default ImageSlider;
