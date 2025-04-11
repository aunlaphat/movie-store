import React, { useEffect, useState } from 'react';
import { searchMovies, getGenres } from '../api/api';
import MovieRow from '../components/MovieRow';
import GenreFilter from '../components/GenreFilter'; 

const Home = ({ cartItems, setCartItems }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterGenre, setFilterGenre] = useState(null);

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

  const filteredMovies = filterGenre
  ? movies.filter((m) => m.genre_ids.includes(filterGenre))
  : movies;

  const topRated = [...movies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);

  const groupMovies = (list, size = 5) => {
    const rows = [];
    for (let i = 0; i < list.length; i += size) {
      rows.push(list.slice(i, i + size));
    }
    return rows;
  };

  return (
    
    <div style={{
        backgroundColor: '#0d0d0d',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingBottom: 80 
      }}>
      <MovieRow title="🎯 ภาพยนตร์แนะนำ" movies={topRated} addToCart={(m) => setCartItems([...cartItems, m])} variant="highlight"/>
      
      <h2 style={{ color: '#facc15', padding: '0 24px', marginTop: 0 }}>📚 ภาพยนตร์ทั้งหมด</h2>
      {groupMovies(filteredMovies).map((group, idx) => (
        <MovieRow key={idx} title={null} movies={group} addToCart={(m) => setCartItems([...cartItems, m])} />
      ))}
    </div>
  );
};

export default Home;