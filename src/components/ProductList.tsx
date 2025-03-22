import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa'; // Import sort icon
import { Product } from '..';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('default'); // State for sorting

  // Extract unique categories from the products array
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products based on the selected sorting option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name); // Sort by name (A-Z)
      case 'name-desc':
        return b.name.localeCompare(a.name); // Sort by name (Z-A)
      case 'latest':
        return new Date(b.id).getTime() - new Date(a.id).getTime(); // Newest first
      case 'oldest':
        return new Date(a.id).getTime() - new Date(b.id).getTime(); // Oldest first
      case 'price-asc':
        return a.price - b.price; // Price low to high
      case 'price-desc':
        return b.price - a.price; // Price high to low
      case 'rating':
        return (b.rating || 0) - (a.rating || 0); // Ratings high to low
      default:
        return 0; // Default (no sorting)
    }
  });

  return (
    <div className="font-sans">
      {/* Category Filters (Scrollable on Mobile) */}
      <div className="relative overflow-x-auto mb-8">
        <div className="flex space-x-4 px-4 py-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              !selectedCategory
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
              }`}
            >
              {category.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
        {/* Gradient overlay for scrollable container */}
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Sort Toolbar */}
      <div className="flex justify-between items-center mb-8 px-4">
        <h3 className="text-lg font-bold text-gray-800">Sort by:</h3>
        <div className="relative">
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="default">Default</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="latest">Latest Added</option>
            <option value="oldest">Old to New</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating">Ratings</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSort className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">Size: {product.size}</p>
              <p className="text-gray-600">Price: Rs {product.price}</p>
              {product.features && (
                <ul className="mt-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              )}
              <button className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;