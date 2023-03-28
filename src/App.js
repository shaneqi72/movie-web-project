import React from 'react';
import './App.css';
import Nav from './components/Nav';
import LandingPage from './pages/LandingPage';
import SearchMovie from './pages/SearchMovie';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Footer from './components/Footer';
import PopularMovies from './pages/PopularMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container-fluid">
        <Router>
          <div className="App">
            <div>
              <Nav />
              <Switch>
                <Route exact path="/">
                  <LandingPage />
                </Route>
                <Route path="/search-movies">
                  <SearchMovie />
                </Route>
                <Route exact path="/movie/:movieId">
                  <MovieDetailsPage />
                </Route>
                <Route exact path="/popularMovies">
                  <PopularMovies />
                </Route>
                <Route exact path="/topRatedMovies">
                  <TopRatedMovies />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
