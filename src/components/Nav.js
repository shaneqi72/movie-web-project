import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const Nav = () => {

    const [searchMovieTerm, setSearchMovieTerm] = useState('');

    const history = useHistory();

    const handleOnChange = (e) => {
        setSearchMovieTerm(e.target.value)
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        history.push(`/search-movies?query=${searchMovieTerm}&page=1`);
    }

    return (
        <nav className=" navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-fluid">
                <a className="nav-brand" href="/">
                    <i className='fas fa-video' style={{ color: 'white', fontSize: '2rem' }}>
                    </i>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ color: 'white' }} >
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ paddingLeft: 12 }}>
                            <Link
                                to='/'
                                className="nav-link active text-white"
                                aria-current="page"
                                style={{ textDecoration: 'none' }}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Movies
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <Link
                                        to='/popularMovies'
                                        className="dropdown-item"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Popular Movies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/topRatedMovies'
                                        className="dropdown-item"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Top-rated Movies
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <form onSubmit={handleOnSubmit} style={{ display: 'flex' }}>
                        <input
                            type='search'
                            value={searchMovieTerm}
                            onChange={handleOnChange}
                            style={{ padding: '.2rem', marginRight: '.1rem', width: '12rem' }}
                        />
                        <Link
                            to={`/search-movies?query=${searchMovieTerm}&page=`}
                            style={{
                                textDecoration: 'none',
                                border: '3px solid white',
                                color: 'white',
                                borderRadius: '3px',
                                padding: '2px', maxWidth: 150
                            }}>
                            Search Movies
                    </Link>
                    </form>

                </div>
            </div>
        </nav >
    )
}

export default Nav
