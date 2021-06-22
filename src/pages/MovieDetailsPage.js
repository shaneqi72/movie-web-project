import React, { useState, useEffect } from "react";
import { API_KEY, API_URL, IMAGE_URL } from "../Config";
import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [movieId]);

  if (!movie) {
    return (
      <div>
        <h2>Loading..</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-5">
          <div className="jumbotron img-fluid">
            {movie && (
              <img
                className="img-fluid"
                src={
                  movie.backdrop_path
                    ? `${IMAGE_URL}w1280${movie.backdrop_path}`
                    : `${IMAGE_URL}w1280/${movie.poster_path}`
                }
                alt=""
              />
            )}
          </div>
        </div>
        <div className="col-xs-12 col-md-7">
          <div>
            <h1>{movie.title}</h1>
          </div>
          <div>
            <p>{movie.runtime}mins</p>
            <h5>
              Production Country:{" "}
              {movie.production_countries[0]?.name
                ? movie.production_countries[0].name
                : "Not available"}
            </h5>
            <h5>Release Date: {movie.release_date}</h5>
            <h5>Overview</h5>
            <p>{movie.overview}</p>
            <h5>User Score: {movie.vote_average}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
