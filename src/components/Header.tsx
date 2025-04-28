import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa"; // Import icons

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper function to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Reusable link styles
  const linkStyles =
    "text-gray-800 hover:text-pink-500 transition duration-300 text-center";
  const activeLinkStyles = "text-pink-500 font-bold";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  const iconLinks = [
    { to: "/cart", icon: <FaShoppingCart size={20} /> },
    { to: "/admin", icon: <FaUser size={20} /> },
  ];

  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition duration-300 text-center"
        >
          Charming Moments
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
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

        {/* Icons for Cart and User */}
        <div className="hidden md:flex space-x-6 items-center">
          {iconLinks.map(({ to, icon }) => (
            <Link
              key={to}
              to={to}
              className={`${linkStyles} ${isActive(to) ? activeLinkStyles : ""}`}
            >
              {icon}
            </Link>
          ))}
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
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`${linkStyles} ${isActive(to) ? activeLinkStyles : ""}`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
            <div className="flex space-x-6">
              {iconLinks.map(({ to, icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`${linkStyles} ${isActive(to) ? activeLinkStyles : ""}`}
                  onClick={toggleMenu}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
