import React, { useState, useEffect } from "react";
import MainImage from "../components/MainImage";
import Movie from "../components/Movie";
// import ImageSlider from "../components/ImageSlider";
import Scroll from "../components/Scroll";
import { API_KEY, API_URL, IMAGE_URL } from "../Config";

const LandingPage = () => {
  const [latestMovies, setLatestMovies] = useState([]);

  const [mainImage, setMainImage] = useState(null);

  const fetchMainImages = () => {
    fetch(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMainImage(data.results))
      .catch((error) => console.log(error));
  };

  const fetchLatestMovies = () => {
    fetch(
      `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&year=2020`
    )
      .then((res) => res.json())
      .then((data) => setLatestMovies(data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchLatestMovies();
    fetchMainImages();
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center flex-column ">
      <div className="container">{/* <ImageSlider /> */}</div>

      <div className="row">
        <div className="col-12">
          {latestMovies[0] && (
            <MainImage
              image={`${IMAGE_URL}w1280${latestMovies[0].poster_path}`}
              title={latestMovies[0].title}
              overView={latestMovies[0].overview}
            />
          )}
        </div>
      </div>

      <div>
        <h2>The Latest Movies</h2>
      </div>

      <Scroll>
        <div className="container-fluid d-flex justify-content-center flex-wrap">
          {latestMovies.map((movie) => (
            <Movie
              image={
                movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`
              }
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              overview={movie.overview}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default LandingPage;
