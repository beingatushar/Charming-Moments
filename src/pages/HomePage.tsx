// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { resinProducts, purseAndWalletProducts } from '../sampleData';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  // Define categories and their products
  const categories = [
    {
      name: 'Resin Products',
      products: resinProducts.slice(0, 5), // Show first 5 resin products
    },
    {
      name: 'Purse and Wallets',
      products: purseAndWalletProducts.slice(0, 5), // Show first 5 purse products
    },
  ];

  return (
    <div className="font-sans">
      {/* Navbar */}
      
      <Header/>

      {/* Hero Section */}
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white">Discover Handmade Elegance & Sweet Indulgences</h1>
          </div>
        </div>
      </section>

      {/* Category Sliders */}
      <section className="container mx-auto px-6 py-8">
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
              <Link
                to={`/shop?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="text-pink-500 hover:text-pink-700"
              >
                View All
              </Link>
            </div>
            <Swiper
              spaceBetween={16}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {category.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600">Price: Rs {product.price}</p>
                      <Link
                        to={`/shop?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
                        className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;