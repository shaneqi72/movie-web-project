import React from 'react';
import Movie from './Movie';
import { IMAGE_URL } from '../Config';

const Movies = ({ movies }) => {

    return (
        <div>
            <div className='container-fluid d-flex justify-content-start flex-wrap'>
                {movies.map((movie) => {
                    return (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            poster_path={movie.poster_path}
                            overview={movie.overview}
                            vote_average={movie.vote_average}
                            image={movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`}
                        />
                    )
                })
                }
            </div>
        </div>

    )
}

export default Movies
