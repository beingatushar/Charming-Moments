import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUsers, FaHeart, FaLightbulb, FaAward } from 'react-icons/fa'; // Import icons

const AboutPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">About Charming Moments</h1>
            <p className="mt-4 text-xl text-gray-200">Crafting Elegance, Creating Joy</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Story</h2>
        <div className="max-w-2xl mx-auto text-center text-gray-600">
          <p>
            At Charming Moments, we blend creativity with passion to bring you unique resin crafts and delectable chocolates. Our mission is to create moments of joy and elegance through our handcrafted products.
          </p>
          <p className="mt-4">
            Founded in 2023, we are a small team of artisans dedicated to delivering high-quality, handmade items that you'll love.
          </p>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <FaHeart className="text-pink-500 mx-auto" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Passion</h3>
              <p className="mt-2 text-gray-600">We pour our heart into every creation.</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <FaLightbulb className="text-pink-500 mx-auto" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Creativity</h3>
              <p className="mt-2 text-gray-600">Innovative designs that inspire.</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <FaUsers className="text-pink-500 mx-auto" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Community</h3>
              <p className="mt-2 text-gray-600">Building connections through art.</p>
            </div>
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <FaAward className="text-pink-500 mx-auto" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mt-4">Excellence</h3>
              <p className="mt-2 text-gray-600">High-quality craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Jane Smith</h3>
            <p className="text-gray-600">Lead Artisan</p>
          </div>
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Emily Brown</h3>
            <p className="text-gray-600">Chocolatier</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;