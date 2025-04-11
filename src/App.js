import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AllMovies from './pages/AllMovie';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';
import { searchMovies } from './api/api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(''); 
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const handleSearch = async (query) => {
    try {
      const data = await searchMovies(query);
      const moviesWithPrice = data.results.map((m) => ({ ...m, price: 99 }));
      setAllMovies(moviesWithPrice);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <Router>
      <Navbar
        // onSearch={handleSearch}
        cartItems={cartItems}
        onSearch={(value) => setSearchKeyword(value)} 
        onLoginClick={() => setShowLogin(true)}
        onClearCart={() => setCartItems([])}
        onCheckout={() => {
          setPurchaseHistory([...purchaseHistory, ...cartItems]);
          setCartItems([]);
          setShowCheckout(true);
        }}
        purchaseHistory={purchaseHistory}
      />

      <Routes>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} allMovies={allMovies} />}
        />
        <Route path="/movies" element={<AllMovies cartItems={cartItems} setCartItems={setCartItems} searchKeyword={searchKeyword} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
      <CheckoutModal visible={showCheckout} onClose={() => setShowCheckout(false)} />
    </Router>
  );
}

export default App;