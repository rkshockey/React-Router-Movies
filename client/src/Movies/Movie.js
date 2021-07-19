import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function Movie(props) {
  const [movie, setMovie] = useState();
  const { save } = props

  let { id } = useParams()

  // Change ^^^ that line and use a hook to obtain the :id parameter from the URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`) // Study this endpoint with Postman
      .then(response => {
        setMovie(response.data)
      })
      .catch(error => {
        console.error(error);
      });
    // This effect should run every time time
    // the `id` changes... How could we do this?
  }, [id]);

  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = evt => {save()}

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { stars } = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <MovieCard movie={movie} />
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={saveMovie(movie)}>Save</div>
    </div>
  );
}
