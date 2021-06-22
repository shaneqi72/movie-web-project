import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../Config';
import './MainImage.css';
import Movie from './Movie';

const MainImage = ({ image, title, overView }) => {

    const [mainImage, setMainImage] = useState(null);

    const fetchMainImages = () => {
        fetch(`${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
            .then((res) => res.json())
            .then((data) => setMainImage(data.results))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        fetchMainImages();
    }, []);


    if (!mainImage) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div className='constainer'>
            <h2>The Popualar Movies</h2>
            <div className="mainImage">
                {mainImage.map((movie) => < Movie
                    image={movie.poster_path && `${IMAGE_URL}w200${movie.poster_path}`}
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster_path={movie.poster_path}
                    overview={movie.overview}
                    vote_average={movie.vote_average} />)
                }

            </div>

        </div>
    )

}
export default MainImage;

