import React, { useState } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import { Product } from "../sampleData";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams(); // Hook for query parameters
  const { addToCart } = useCartStore();

  // Get the current sortBy and category values from query parameters
  const sortBy = searchParams.get("sortBy") || "default";
  const selectedCategory = searchParams.get("category") || null;

  // Extract unique categories from the products array
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products based on the selected filter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-to-high":
        return a.price - b.price;
      case "price-high-to-low":
        return b.price - a.price;
      case "date-added-newest":
        return (
          new Date(b.dateAdded || "").getTime() -
          new Date(a.dateAdded || "").getTime()
        );
      case "date-added-oldest":
        return (
          new Date(a.dateAdded || "").getTime() -
          new Date(b.dateAdded || "").getTime()
        );
      case "rating-high-to-low":
        return (b.rating || 0) - (a.rating || 0);
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Handle "Add to Cart" button click
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "https://via.placeholder.com/150",
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Update query parameters when sortBy changes
  const handleSortChange = (value: string) => {
    if (value === "default") {
      searchParams.delete("sortBy"); // Remove sortBy parameter for default
    } else {
      searchParams.set("sortBy", value); // Set sortBy parameter
    }
    setSearchParams(searchParams); // Update the URL
  };

  // Update query parameters when category changes
  const handleCategoryChange = (category: string | null) => {
    if (category === null) {
      searchParams.delete("category"); // Remove category parameter for "All"
    } else {
      searchParams.set("category", category); // Set category parameter
    }
    setSearchParams(searchParams); // Update the URL
  };

  return (
    <div className="font-sans">
      {/* Category Filters */}
      <div className="flex justify-center space-x-4 space-y-2 mb-8 flex-wrap">
        <button
          onClick={() => handleCategoryChange(null)} // Update category in query params
          className={`px-6 py-2 rounded-full ${
            !selectedCategory
              ? "bg-pink-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)} // Update category in query params
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-pink-500 hover:text-white transition duration-300"
            }`}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      {/* Sorting Filters */}
      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)} // Update query parameters
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="default">Sort By</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="date-added-newest">Date Added: Newest</option>
          <option value="date-added-oldest">Date Added: Oldest</option>
          <option value="rating-high-to-low">Rating: High to Low</option>
          <option value="name-a-z">Name: A-Z</option>
          <option value="name-z-a">Name: Z-A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
              <h3 className="text-lg font-bold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600">Price: Rs {product.price}</p>
              {product.features && (
                <ul className="mt-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">
                      • {feature}
                    </li>
                  ))}
                </ul>
              )}
              <button
                onClick={() => handleAddToCart(product)}
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
