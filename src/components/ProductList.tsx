// src/components/ProductList.tsx
import React, { useState } from 'react';
import { Product } from '../sampleData';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCartStore();

  // Extract unique categories from the products array
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Handle "Add to Cart" button click
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || 'https://via.placeholder.com/150',
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="font-sans">
      {/* Category Filters */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full ${
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
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300'
            }`}
          >
            {category.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
              <p className="text-gray-600">Price: Rs {product.price}</p>
              {product.features && (
                <ul className="mt-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleAddToCart(product)} // Add to cart handler
                className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
              >
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