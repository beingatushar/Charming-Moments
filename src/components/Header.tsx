// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa'; // Import icons

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition duration-300 text-center">
          Charming Moments
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            Home
          </Link>
          <Link to="/shop" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            Shop
          </Link>
          <Link to="/about" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            Contact
          </Link>
        </nav>

        {/* Icons for Cart and User */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/cart" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            <FaShoppingCart size={20} />
          </Link>
          <Link to="/profile" className="text-gray-800 hover:text-pink-500 transition duration-300 text-center">
            <FaUser size={20} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 hover:text-pink-500 focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-md">
          <nav className="flex flex-col space-y-4 p-6">
            <Link
              to="/"
              className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="flex space-x-6">
              <Link
                to="/cart"
                className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
                onClick={toggleMenu}
              >
                <FaShoppingCart size={20} />
              </Link>
              <Link
                to="/profile"
                className="text-gray-800 hover:text-pink-500 transition duration-300 text-center"
                onClick={toggleMenu}
              >
                <FaUser size={20} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;