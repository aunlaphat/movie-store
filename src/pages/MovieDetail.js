import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/api';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <div style={{ color: 'white', padding: 40 }}>Loading...</div>;

  return (
    <div
      style={{
        backgroundColor: '#0f0f0f',
        color: 'white',
        minHeight: '100vh',
        padding: '40px 24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* ชื่อเรื่อง */}
        <h1 style={{ color: '#ccc', fontSize: 32, fontWeight: 'bold' }}>{movie.title}</h1>

        {/* รูป + รายละเอียด */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            style={{
              width: '100%',
              borderRadius: 16,
              maxHeight: 440,
              objectFit: 'cover',
            }}
          />

          <div style={{ fontSize: 16, lineHeight: 1.8, color: '#ccc' }}>
            <p style={{ marginBottom: 16 }}>{movie.overview}</p>
            <p>
              <strong>⭐:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>ความยาว:</strong> {movie.runtime} นาที
            </p>
            <p>
              <strong>วันฉาย:</strong>{' '}
              {new Date(movie.release_date).toLocaleDateString('th-TH', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
