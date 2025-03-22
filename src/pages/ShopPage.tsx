import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { resinProducts, purseAndWalletProducts } from '../sampleData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Combine all products
  const allProducts = [...resinProducts, ...purseAndWalletProducts];

  // Filter products based on category
  const filteredProducts = category
    ? allProducts.filter((product) =>
        product.category.toLowerCase().replace(/ /g, '-') === category
      )
    : allProducts;

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Shop Our Collection</h1>
            <p className="mt-2 text-xl text-gray-200">Discover Handmade Elegance & Sweet Delights</p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex justify-center space-x-4">
          <Link
            to="/shop"
            className={`px-6 py-2 rounded-full ${
              !category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
            }`}
          >
            All
          </Link>
          <Link
            to="/shop?category=resin-products"
            className={`px-6 py-2 rounded-full ${
              category === 'resin-products'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
            }`}
          >
            Resin Products
          </Link>
          <Link
            to="/shop?category=purse-and-wallets"
            className={`px-6 py-2 rounded-full ${
              category === 'purse-and-wallets'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
            }`}
          >
            Purse & Wallets
          </Link>
        </div>
      </section>

      {/* Product List */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {category ? `${category.replace(/-/g, ' ')}` : 'Shop All Products'}
        </h2>
        <ProductList products={filteredProducts} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;