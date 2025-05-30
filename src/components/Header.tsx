import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const linkStyles =
    "text-gray-800 hover:text-pink-500 transition duration-300";
  const activeLinkStyles = "text-pink-500 font-bold";

  // Navigation links with labels
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  // Separate cart icon from text links

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition duration-300"
        >
          Charming Moments
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <nav className="flex space-x-6 items-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`${linkStyles} ${isActive(to) ? activeLinkStyles : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Cart + Mobile Toggle */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-pink-500 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          {/* Cart Icon - Always visible */}
          <Link
            to="/cart"
            aria-label="Cart"
            className={`rounded-full p-2 bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition-colors duration-200 shadow-md ${
              isActive("/cart") ? "ring-2 ring-pink-500" : ""
            }`}
          >
            <FaShoppingBag size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-md">
          <nav className="flex flex-col space-y-4 p-6 items-center">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${linkStyles} ${isActive(item.to) ? activeLinkStyles : ""} text-center`}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
