import React from 'react';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import shopImage from '../assets/home.png';
const ShopPage: React.FC = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection title="Shop Our Collection" backgroundImage={shopImage} />

      {/* Product List */}
      <section className="container mx-auto px-6 py-8">
        {<ProductList />}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;
