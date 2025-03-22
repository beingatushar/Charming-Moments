import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { Toaster } from 'react-hot-toast';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Router>
      <Toaster /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
      </Routes>
    </Router>
  );
};

export default App;