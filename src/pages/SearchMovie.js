import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Movie from '../components/Movie';
import Pagination from '../components/Pagination';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import { useQuery as useQueryFromPath } from '../hooks/hooks';

import { useQuery } from '@tanstack/react-query';

const searchMovieQuery = ({ API_KEY, API_URL, movieName, currentPage }) => {
  return axios.get(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=${currentPage}`);
};

const SearchMovie = () => {
  const history = useHistory();

  const query = useQueryFromPath();
  let movieName = query.get('query');
  const currentPage = Number(query.get('page')) || 1;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['search-movie'],
    queryFn: () => searchMovieQuery({ API_KEY, API_URL, movieName, currentPage }),
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  console.log(data);

  const { results: searchMovieResults, total_pages: totalPages } = data.data;

  const onChangePage = (p) => {
    history.push(`/search-movies?query=${movieName}&page=${p}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container-fluid d-flex justify-content-center flex-wrap">
      {/* <form action="" className="d-flex" style={{ margin: '2rem auto' }}>
                <input type="search" className="form-control me-2" placeholder='Search Movies' aria-label='Search' value={searchText} onChange={handleOnChange} />
                {/* <Link to={`/search-movies/${movieTitle}`}>
                    <a onClick={handleOnSubmit} className='btn btn-outline-success' type='submit' href={`search-movies/${searchText}`}>Search</a>
                </Link> */}
      {/* <button onClick={handleOnSubmit} className='btn btn-outline-success' type='submit'>Search</button>
            </form> */}
      <div className="container-fluid d-flex justify-content-center flex-wrap">
        {searchMovieResults.map((movie) => (
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

      <div>
        {totalPages > 1 ? (
          <Pagination pages={totalPages} onChangePage={onChangePage} currentPage={currentPage} />
        ) : null}
      </div>
    </div>
  );
};

export default SearchMovie;
