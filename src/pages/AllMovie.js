import React, { useEffect, useState } from 'react';
import { searchMovies, getGenres } from '../api/api';
import { Pagination, Button  } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MovieRow from '../components/MovieRow';
import GenreFilter from '../components/GenreFilter'; 

const AllMovie = ({ cartItems, setCartItems }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterGenre, setFilterGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const filteredMovies = filterGenre
  ? movies.filter((m) => m.genre_ids.includes(filterGenre))
  : movies;

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredMovies.length / pageSize);

  const topRated = [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
  const allMovies = movies;

  const groupMovies = (list, size = 5) => {
    const rows = [];
    for (let i = 0; i < list.length; i += size) {
      rows.push(list.slice(i, i + size));
    }
    return rows;
  };

  useEffect(() => {
    async function fetchData() {
      const movieData = await searchMovies('a');
      const genresData = await getGenres();
  
      const moviesWithExtra = movieData.results.map((movie) => {
        const genre_names = movie.genre_ids.map(
          (gid) => genresData.find((g) => g.id === gid)?.name
        );
        return { ...movie, price: 99, genre_names };
      });
  
      setMovies(moviesWithExtra);
      setGenres(genresData);
    }
  
    fetchData();
  }, []);

  return (
    
    <div style={{
        backgroundColor: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 30,
        paddingBottom: 0 
      }}>
      <div style={{ padding: '0 24px', marginBottom: 10 }}>
        <GenreFilter genres={genres} onChange={setFilterGenre} />
      </div>
      
      <h2 style={{ color: '#facc15', padding: '0 24px' }}>📚 ภาพยนตร์ทั้งหมด</h2>

      {groupMovies(paginatedMovies).map((group, idx) => (
        <MovieRow
            key={idx}
            title={null}
            movies={group}
            addToCart={(m) => setCartItems([...cartItems, m])}
        />
      ))}
      {/* ✅ Pagination */}
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 0,
    marginBottom: 60,
  }}
>
  <Button
    type="default"
    shape="circle"
    icon={<LeftOutlined />}
    disabled={currentPage === 1}
    onClick={() => {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  />

  <span style={{ color: '#facc15', fontWeight: 'bold', minWidth: 80, textAlign: 'center' }}>
    หน้า {currentPage} / {totalPages}
  </span>

  <Button
    type="default"
    shape="circle"
    icon={<RightOutlined />}
    disabled={currentPage === totalPages}
    onClick={() => {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
  />
</div>


    </div>
    );
    };

export default AllMovie;