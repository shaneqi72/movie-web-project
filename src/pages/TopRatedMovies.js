import React, { useState, useEffect } from 'react';
import Movie from '../components/Movie';
import Pagination from '../components/Pagination';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

const TopRatedMovies = () => {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchTopRatedMovies = (page) => {
        fetch(`${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${page || 1}`)
            .then((res) => res.json())
            .then((data) => {
                setTopRatedMovies(data.results);
                setTotalResults(data.total_results);
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        fetchTopRatedMovies(currentPage);
    }, [currentPage]);

    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    console.log('topratedMovie', topRatedMovies)

    const numberPages = Math.floor(totalResults / 20);

    return (
        <div className='container-fluid d-flex justify-content-center flex-column '>

            <div>
                <h2>The Top-Rated Movies</h2>
            </div>

            <div className='container-fluid d-flex justify-content-center flex-wrap'>
                {topRatedMovies.map((movie) => (
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
                {totalResults > 20 ? (
                    <Pagination
                        pages={numberPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        onChangePage={onChangePage}
                    />
                ) : null}
            </div>

        </div>
    )
}

export default TopRatedMovies
