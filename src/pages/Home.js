import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import Cart from '../components/Cart';
import CheckoutModal from '../components/CheckoutModal';
import GenreFilter from '../components/GenreFilter';
import { searchMovies, getGenres } from '../api/api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterGenre, setFilterGenre] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // โหลดจาก localStorage ตอนแรก
useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);
  
  // sync ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  

  useEffect(() => {
    fetchMovies();
    getGenres().then(setGenres);
  }, []);

  const fetchMovies = async (q = 'a') => {
    const data = await searchMovies(q);
    const moviesWithPrice = data.results.map((m) => ({ ...m, price: 100 }));
    setMovies(moviesWithPrice);
  };

  const filtered = filterGenre ? movies.filter((m) => m.genre_ids.includes(filterGenre)) : movies;

  return (
    <div style={{ backgroundColor: '#ffb933', minHeight: '100vh' }}>
      <Header onSearch={fetchMovies} />
      <div style={{ padding: 20 }}>
        <GenreFilter genres={genres} onChange={setFilterGenre} />
        <MovieList movies={filtered} addToCart={(m) => setCartItems([...cartItems, m])} />
        <Cart cartItems={cartItems} clearCart={() => setCartItems([])} />
        <button onClick={() => setShowCheckout(true)} style={{ marginTop: 20 }}>🧾 ชำระเงิน</button>
      </div>
      <CheckoutModal visible={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  );
}

export default Home;