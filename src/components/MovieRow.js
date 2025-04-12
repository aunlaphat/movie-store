import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { getMovieDetails } from '../api/api';
const { Meta } = Card;

const MovieRow = ({ title, movies, addToCart, variant = 'default', user, cartItems = [], purchaseHistory = [] }) => {
  const [runtimeMap, setRuntimeMap] = useState({});
  const [priceMap, setPriceMap] = useState({});
  const [editPriceId, setEditPriceId] = useState(null);

  const handlePriceChange = (id, newPrice) => {
    setPriceMap((prev) => ({
      ...prev,
      [id]: parseFloat(newPrice) || 0,
    }));
  };

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

    const savedPrices = JSON.parse(localStorage.getItem('movie_prices') || '{}');
    const updated = {};
    movies.forEach((m) => {
      updated[m.id] = savedPrices[m.id] ?? m.price ?? 99;
    });
    setPriceMap(updated);
  }, [movies]);

  const hasPurchased = (movieId) => {
    return purchaseHistory.some(order =>
      order.items && order.items.some(item => item.id === movieId)
    );
  };

  return (
    <div style={{ marginBottom: 5 }}>
      <h2 style={{ color: '#facc15', padding: '0 24px', marginBottom: 15 }}>{title}</h2>
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
                    <div
                      style={{
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
                      }}
                    >
                      {index + 1}
                    </div>
                  )}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                    style={{
                      height: 380,
                      width: '100%',
                      position: 'relative',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="movie-hover-overlay">
                    <div
                      className="movie-hover-details"
                      style={{ fontSize: 13, color: '#ccc', paddingLeft: 25 }}
                    >
                      <p>
                        ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : '—'} / 10
                      </p>
                      <p>⏱ {formatRuntime(runtimeMap[movie.id])}</p>
                    </div>
                    <Link to={`/movie/${movie.id}`}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          className="movie-button"
                          style={{
                            marginTop: 10,
                            backgroundColor: '#ccc',
                            color: 'gray',
                            borderColor: '#ccc',
                            fontWeight: 500,
                            width: '80%',
                            height: '80%',
                          }}
                        >
                          ดูเพิ่มเติม
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              }
            >
              <div style={{ color: '#facc15', fontSize: 12 }}>
                {new Date(movie.release_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
              </div>
              <Meta title={<span className="meta-title">{movie.title}</span>} />
              <div style={{ marginTop: 6, flexWrap: 'wrap', minHeight: 28 }}>
                {movie.genre_names?.slice(0, 2).map((genre) => (
                  <Tag key={genre} color="#cfcfcf" style={{ color: '#000', fontSize: 11, padding: '0 6px' }}>{genre}</Tag>
                ))}
              </div>
              <div style={{ marginTop: 2 }}>
                <Tag color="#cfcfcf" style={{ fontSize: 11, color: '#000' }}>
                  lang: {movie.original_language.toUpperCase()}
                </Tag>
              </div>

              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                {user?.role === 'admin' ? (
                  editPriceId === movie.id ? (
                    <>
                      <Input
                        size="small"
                        type="number"
                        value={priceMap[movie.id]}
                        onChange={(e) => handlePriceChange(movie.id, e.target.value)}
                        style={{ width: '30%', fontSize: 14, padding: '2px 6px' }}
                      />
                      <CheckOutlined
                        onClick={() => {
                          setEditPriceId(null);
                          const updatedPrices = {
                            ...JSON.parse(localStorage.getItem('movie_prices') || '{}'),
                            [movie.id]: priceMap[movie.id],
                          };
                          localStorage.setItem('movie_prices', JSON.stringify(updatedPrices));

                          setPriceMap((prev) => ({
                            ...prev,
                            [movie.id]: priceMap[movie.id],
                          }));
                        }}
                        style={{ color: '#22c55e', fontSize: 16, cursor: 'pointer' }}
                      />
                    </>
                  ) : (
                    <>
                      <span style={{ color: '#ccc', fontSize: 14 }}>฿{priceMap[movie.id] ?? 99}</span>
                      <EditOutlined
                        onClick={() => setEditPriceId(movie.id)}
                        style={{ color: '#ccc', fontSize: 16, cursor: 'pointer' }}
                      />
                    </>
                  )
                ) : (
                  <span style={{ color: '#facc15', fontSize: 14 }}>฿{priceMap[movie.id] ?? 99}</span>
                )}
              </div>

              <Button
                type="primary"
                block
                style={{ marginTop: 5 }}
                onClick={() => {
                  if (!user) {
                    message.warning('กรุณาเข้าสู่ระบบก่อนใส่ตะกร้า');
                    return;
                  }

                  const alreadyInCart = cartItems.some((item) => item.id === movie.id);
                  if (alreadyInCart) {
                    message.info('รายการนี้อยู่ในตะกร้าแล้ว');
                    return;
                  }

                  if (hasPurchased(movie.id)) {
                    message.info('คุณเคยซื้อเรื่องนี้ไปแล้ว');
                    return;
                  }

                  addToCart({ ...movie, price: priceMap[movie.id] ?? 99 });
                }}
              >
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
