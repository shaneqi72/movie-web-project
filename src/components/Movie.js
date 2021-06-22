import React from 'react';
import './Movie.css';
import { Link } from 'react-router-dom'


const Movie = ({ id, title, vote_average, image }) => {

    const setVoteClass = (vote) => {
        if (vote >= 8) {
            return 'green'
        } else if (vote >= 6) {
            return 'orange'
        } else {
            return 'red'
        }
    };
    return (

        <div className="row">
            <div className="col-12 m-1">
                <Link to={{ pathname: `/movie/${id}` }}>
                    <img
                        src={image ? image : 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI'}
                        className='img-fluid rounded float'
                        alt={title}>
                    </img>
                </Link>
                <div className=' container-fluid movie-info' style={{ width: '200px', textAlign: 'center' }}>
                    <h6>{title}</h6>
                    <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
                </div>
            </div>
        </div>



    )
}

export default Movie;
