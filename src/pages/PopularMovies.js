import axios from 'axios';
import React, { useState } from 'react';
import Movie from '../components/Movie';
import Pagination from '../components/Pagination';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

import { useQuery } from '@tanstack/react-query';

const fetchPopularMovies = ({ currentPage, API_URL, API_KEY }) => {
  return axios.get(
    `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}`
  );
};

const PopularMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['popular-movies', currentPage],
    queryFn: () => fetchPopularMovies({ currentPage, API_URL, API_KEY }),
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const { results: popularMovies, total_pages: totalPages } = data.data;

  return (
    <div className="container-fluid d-flex justify-content-center flex-column">
      <div>
        <h2>The Popular Movies</h2>
      </div>

      <div className="container-fluid d-flex justify-content-center flex-wrap">
        {popularMovies.map((movie) => (
          <Movie
            image={movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`}
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </div>

      <div className="container">
        {totalPages > 20 ? (
          <Pagination
            pages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onChangePage={onChangePage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PopularMovies;
