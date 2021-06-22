import React, { useState, useEffect } from 'react'
import Movie from '../components/Movie';
import Pagination from '../components/Pagination'
import { API_KEY, API_URL, IMAGE_URL } from '../Config';

const PopularMovies = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPopularMovies = (page) => {
        fetch(`${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page || 1}`)
            .then((res) => res.json())
            .then((data) => {
                setPopularMovies(data.results);
                setTotalResults(data.total_results);

            })
            .catch((error) => console.log(error))
    };

    const onChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    useEffect(() => {
        fetchPopularMovies(currentPage)
    }, [currentPage]);

    const numberPages = Math.floor(totalResults / 20);

    return (
        <div className='container-fluid d-flex justify-content-center flex-column'>

            <div>
                <h2>The Popular Movies</h2>
            </div>

            <div className='container-fluid d-flex justify-content-center flex-wrap'>
                {popularMovies.map((movie) => <Movie
                    image={movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`}
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                    vote_average={movie.vote_average} />)}
            </div>

            <div className='container'>
                {totalResults > 20 ? <Pagination
                    pages={numberPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onChangePage={onChangePage}
                />
                    : null}
            </div>

        </div>
    )
};

export default PopularMovies;
