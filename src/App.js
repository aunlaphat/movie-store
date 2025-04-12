import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { message } from 'antd';
import Home from './pages/Home';
import AllMovies from './pages/AllMovie';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [searchKeyword, setSearchKeyword] = useState(''); 
  const [showLogin, setShowLogin] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [showRegister, setShowRegister] = useState(false);

  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const loadUserData = (username) => {
    const storedCart = localStorage.getItem(`${username}_cart`);
    const storedHistory = localStorage.getItem(`${username}_history`);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
    setPurchaseHistory(storedHistory ? JSON.parse(storedHistory) : []);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      loadUserData(parsedUser.username);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.username}_cart`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${user.username}_history`, JSON.stringify(purchaseHistory));
    }
  }, [purchaseHistory, user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCartItems([]);
    setPurchaseHistory([]);
    message.success('ออกจากระบบแล้ว');
  };

  return (
    <Router>
      <Navbar
        cartItems={cartItems}
        onSearch={(value) => setSearchKeyword(value)} 
        onLoginClick={() => setShowLogin(true)}
        onClearCart={() => setCartItems([])}
        onCheckout={() => setShowCheckout(true)}
        purchaseHistory={purchaseHistory}
        user={user}
        onLogout={handleLogout}
      />

      <CheckoutModal
        visible={showCheckout} 
        onClose={() => setShowCheckout(false)}  
        onConfirm={() => {
          if (cartItems.length === 0) return;
          const timestamp = new Date().toISOString();
          const currentCart = [...cartItems]; // ✅ สำเนาไว้ก่อนล้าง
          setCartItems([]);
          setShowCheckout(false);
          setPurchaseHistory([...purchaseHistory, { timestamp, items: currentCart }]);
        }}
        
      />

      <LoginModal
        visible={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={(userData) => {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          loadUserData(userData.username);
        }}
        onRegisterClick={() => {
          setShowLogin(false);      
          setShowRegister(true);    
        }}
      />

      <Routes>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} allMovies={allMovies} user={user} purchaseHistory={purchaseHistory}/>}
        />
        <Route path="/movies" element={<AllMovies cartItems={cartItems} setCartItems={setCartItems} searchKeyword={searchKeyword} user={user} purchaseHistory={purchaseHistory}/>} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;