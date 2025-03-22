// src/pages/AboutPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const AboutPage: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="About Us"
        backgroundImage="https://via.placeholder.com/1200x400"
      />

      {/* About Content */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Story</h2>
        <div className="mt-8 text-center text-gray-600">
          <p>
            At Charming Moments, we blend creativity with passion to bring you unique resin crafts and delectable chocolates. Our mission is to create moments of joy and elegance through our handcrafted products.
          </p>
          <p className="mt-4">
            Founded in 2023, we are a small team of artisans dedicated to delivering high-quality, handmade items that you'll love.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;