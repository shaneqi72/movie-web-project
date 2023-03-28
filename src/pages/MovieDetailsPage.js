import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

const fetchMovieDetail = ({ API_URL, movieId, API_KEY }) => {
  return axios.get(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  // const [movie, setMovie] = useState(null);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['movieDetail'],
    queryFn: () => fetchMovieDetail({ API_URL, movieId, API_KEY }),
  });

  // useEffect(() => {
  //   fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovie(data);
  //     });
  // }, [movieId]);

  if (isLoading) {
    return (
      <div>
        <h2>Loading..</h2>
      </div>
    );
  }

  console.log(data);
  if (isError) console.log(error);

  // setMovie(data);

  const {
    data: { title, backdrop_path, poster_path, runtime, production_countries, release_date, overview, vote_average },
  } = data;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-5">
          <div className="jumbotron img-fluid">
            {data && (
              <img
                className="img-fluid"
                src={backdrop_path ? `${IMAGE_URL}w1280${backdrop_path}` : `${IMAGE_URL}w1280/${poster_path}`}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="col-xs-12 col-md-7">
          <div>
            <h1>{title}</h1>
          </div>
          <div>
            <p>{runtime}mins</p>
            <h5>Production Country: {production_countries[0]?.name ?? 'Not available'}</h5>
            <h5>Release Date: {release_date}</h5>
            <h5>Overview</h5>
            <p>{overview}</p>
            <h5>User Score: {vote_average}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
