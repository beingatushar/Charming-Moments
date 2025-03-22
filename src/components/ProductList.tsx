// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../sampleData';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
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
            <button className="mt-4 w-full bg-pink-500 text-white px-4 py-2 rounded-lg">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;