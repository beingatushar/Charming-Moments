// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { resinProducts, purseAndWalletProducts } from '../sampleData';

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
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Charming Moments</div>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
            <Link to="/shop" className="text-gray-800 hover:text-gray-600">Shop</Link>
            <Link to="/about" className="text-gray-800 hover:text-gray-600">About Us</Link>
            <Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link>
          </nav>
        </div>
      </header>

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
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold">Charming Moments</h3>
              <p className="mt-2 text-gray-400">Handcrafted Elegance & Sweet Delights</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="mt-2 text-gray-400">Email: info@charmingmoments.com</p>
              <p className="text-gray-400">Phone: 8368580432</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;