import React, { useEffect, useState } from 'react';
import { Card, Button, Tag } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { searchMovies, getMovieDetails } from '../api/api';
const { Meta } = Card;

const MovieRow = ({ title, movies, addToCart, variant = 'default' }) => {
    const [runtimeMap, setRuntimeMap] = useState({});

    const formatRuntime = (mins) => {
        if (!mins) return '—';
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        if (hours && minutes) return `${hours} ชม. ${minutes} นาที`;
        if (hours) return `${hours} ชม.`;
        return `${minutes} นาที`;
    };

    useEffect(() => {
        const fetchRuntimes = async () => {
          const results = await Promise.all(
            movies.map(async (movie) => {
              const detail = await getMovieDetails(movie.id);
              return { id: movie.id, runtime: detail.runtime };
            })
          );
    
          const map = {};
          results.forEach(({ id, runtime }) => {
            map[id] = runtime;
          });
          setRuntimeMap(map);
        };
    
        fetchRuntimes();
    }, [movies]);

  return (
    <div style={{ marginBottom: 5 }}>
      <h2 style={{ color: '#facc15', padding: '0 24px' }}>{title}</h2>
      <div style={{ display: 'flex', overflowX: 'hidden', overflowY: 'hidden', padding: '0 24px', gap: 28 }}>
        {movies.map((movie, index) => (
          <div key={movie.id} style={{ position: 'relative' }}>
            <Card
              className="movie-hover-card"
              hoverable
              style={{
                width: 270,
                flexShrink: 0,
                backgroundColor: '#000',
                border: 'none',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 600,
              }}
              cover={
                <div className="movie-cover-container">
                {variant === 'highlight' && (
                    <div style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: '#facc15',
                        fontWeight: 'bold',
                        fontSize: 28,
                        borderRadius: '50%',
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                        
                    }}>
                        {index + 1}
                    </div>
                )}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                    style={{ height: 380, width: '100%', position: 'relative', objectFit: 'cover' }}
                  />

                  <div className="movie-hover-overlay">
                    <div className="movie-hover-details" style={{ fontSize: 13, color: '#ccc', paddingLeft: 25}}>
                    <p>
                        ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '—'} / 10
                    </p>
                    <p>
                        ⏱ {formatRuntime(runtimeMap[movie.id])}
                    </p>
                    </div>
                    <Link to={`/movie/${movie.id}`}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button className="movie-button" style={{ marginTop: 10, backgroundColor: '#ccc', color: 'gray', borderColor: '#ccc',fontWeight: 500, width: '80%', height: '80%', }}>ดูเพิ่มเติม</Button>
                    </div>
                    </Link>
                  </div>
                </div>
              }
            >
            <div style={{ color: '#facc15', fontSize: 12 }}>{new Date(movie.release_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</div>
            <Meta title={<span className="meta-title">{movie.title}</span>} />

            {/* หมวดหมู่ */}
            <div style={{ marginTop: 6, flexWrap: 'wrap', minHeight: 28, }}>
                {movie.genre_names?.slice(0, 2).map((genre) => (
                <Tag key={genre} color="#cfcfcf" style={{ color: '#000', fontSize: 11, padding: '0 6px' }}>
                    {genre}
                </Tag>
                ))}
            </div>

            {/* ภาษา */}
            <div style={{ marginTop: 2 }}>
                <Tag color="#cfcfcf" style={{ fontSize: 11, color: '#333' }}>
                ภาษา: {movie.original_language.toUpperCase()}
                </Tag>
            </div>

            {/* ราคา */}
            <p style={{ marginTop: 6, color: '#facc15' }}>฿{movie.price || 99}</p>
            <Button type="primary" block onClick={() => addToCart(movie)}>
            ใส่ตะกร้า
            </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
