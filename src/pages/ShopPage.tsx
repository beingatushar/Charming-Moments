// src/pages/ShopPage.tsx
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { resinProducts, purseAndWalletProducts } from '../sampleData';

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
    <div className="font-sans">
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

      <section className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {category ? `${category.replace(/-/g, ' ')}` : 'Shop All Products'}
        </h2>
        <ProductList products={filteredProducts} />
      </section>

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

export default ShopPage;