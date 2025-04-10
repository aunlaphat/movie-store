import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div style={{ padding: 40, backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} style={{ width: '100%', maxWidth: 700 }} />
      <p>{movie.overview}</p>
      <p>คะแนน: {movie.vote_average}</p>
      <p>ความยาว: {movie.runtime} นาที</p>
      <p>วันฉาย: {movie.release_date}</p>
    </div>
  );
};

export default MoviePage;