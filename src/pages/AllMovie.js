import React, { useEffect, useState } from 'react';
import { searchMovies, getGenres } from '../api/api';
import { Button  } from 'antd';
import { LeftOutlined, RightOutlined, SearchOutlined, } from '@ant-design/icons';
import MovieRow from '../components/MovieRow';
import GenreFilter from '../components/GenreFilter'; 

const AllMovie = ({ cartItems, setCartItems, purchaseHistory }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterGenre, setFilterGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 15;

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredMovies = movies.filter((m) => {
    const matchGenre = filterGenre ? m.genre_ids.includes(filterGenre) : true;
    const matchSearch = m.title.toLowerCase().startsWith(searchTerm);
    return matchGenre && matchSearch;
  }); 

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredMovies.length / pageSize);

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
      <div style={{ padding: '0 24px', marginBottom: 10, display: 'flex', gap: 16 }}>
        <GenreFilter genres={genres} onChange={setFilterGenre} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 20px',
          borderRadius: 8,
          backgroundColor: '#fff',
          width: 250,
        }}>
          <SearchOutlined style={{ color: '#ccc', fontSize: 16 }} />
          <input
            type="text"
            placeholder="ค้นหาหนัง..."
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'black',
              width: '100%',
              fontFamily: 'inherit',
              fontSize: 14
            }}
          />
        </div>
      </div>
      
      <h2 style={{ color: '#facc15', padding: '0 24px', marginBottom: 5 }}>📽️ ภาพยนตร์ทั้งหมด</h2>
      {groupMovies(paginatedMovies).map((group, idx) => (
        <MovieRow
            key={idx}
            title={null}
            movies={group}
            cartItems={cartItems}
  purchaseHistory={purchaseHistory}
            addToCart={(m) => {
              const latestPrices = JSON.parse(localStorage.getItem('movie_prices') || '{}');
              setCartItems([...cartItems, { ...m, price: latestPrices[m.id] ?? m.price ?? 99 }]);
            }}
            user={user}
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