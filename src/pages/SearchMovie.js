import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Movie from '../components/Movie';
import Pagination from '../components/Pagination';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import { useQuery } from '../hooks/hooks';

const SearchMovie = () => {

    const history = useHistory();

    const [searchMovieResults, setSearchMovieResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    const query = useQuery();
    let movieName = query.get('query');
    const currentPage = Number(query.get('page')) || 1;


    useEffect(() => {
        /**
         * Calls search movie api
         */
        const searchMovies = () => {

            if (movieName) {
                fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=${currentPage}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.results) {
                            setSearchMovieResults(data.results);
                            setTotalResults(data.total_results);
                        }
                    })
            };
        };

        searchMovies();
    }, [movieName, currentPage]);

    const onChangePage = (p) => {
        history.push(`/search-movies?query=${movieName}&page=${p}`);
        window.scrollTo(0, 0);
    };

    const numberPages = Math.floor(totalResults / 20);

    return (
        <div className='container-fluid d-flex justify-content-center flex-wrap'>
            {/* <form action="" className="d-flex" style={{ margin: '2rem auto' }}>
                <input type="search" className="form-control me-2" placeholder='Search Movies' aria-label='Search' value={searchText} onChange={handleOnChange} />
                {/* <Link to={`/search-movies/${movieTitle}`}>
                    <a onClick={handleOnSubmit} className='btn btn-outline-success' type='submit' href={`search-movies/${searchText}`}>Search</a>
                </Link> */}
            {/* <button onClick={handleOnSubmit} className='btn btn-outline-success' type='submit'>Search</button>
            </form> */}
            <div className='container-fluid d-flex justify-content-center flex-wrap'>
                {searchMovieResults.map((movie) => <Movie
                    image={movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`}
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                    vote_average={movie.vote_average}
                />)}
            </div>

            <div>
                {totalResults > 20 ? (
                    <Pagination
                        pages={numberPages}
                        onChangePage={onChangePage}
                        currentPage={currentPage}
                    />
                ) : null}

            </div>

        </div>
    )
}


export default SearchMovie;
