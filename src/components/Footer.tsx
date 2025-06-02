import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa'; // Import icons

const Footer: React.FC = () => {
  const socialLinks = {
    instagram: 'https://instagram.com/charmimg_moments',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  };

  const linkStyles =
    'text-gray-400 hover:text-pink-500 transition duration-300';
  const iconStyles =
    'text-gray-400 hover:text-pink-500 transition duration-300';

  return (
    <footer className="bg-gray-900 text-white mt-16 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-pink-500">
              Charming Moments
            </h3>
            <p className="text-gray-400">
              Handcrafted Elegance & Sweet Delights
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyles}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyles}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={iconStyles}
              >
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={linkStyles}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className={linkStyles}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkStyles}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkStyles}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-pink-500" />
                <span>charmingmomentsbypooja310777@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-pink-500" />
                <span>+91 8368580432</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Charming Moments. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
