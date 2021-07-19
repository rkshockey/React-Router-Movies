import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          setMovieList(response.data);
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    const list = saved;
    if (list.length !== 0){
      for (let i = 0; i < list.length; i++){
        if (list[i].id === movie.id){
          return list;
        }
      }
      list.push(movie);
      setSaved(list);
    }
  };

  return (
    <div>
      <SavedList list={saved} />

      <Switch>
        <Route exact path='/'>
          <MovieList movies={movieList} />
        </Route>
        <Route path='/movies/:id'>
          <Movie save={addToSavedList} />
        </Route>
      </Switch>
    </div>
  );
}
