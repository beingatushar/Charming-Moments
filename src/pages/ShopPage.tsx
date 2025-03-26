// src/pages/ShopPage.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import useProductStore from "../store/productStore";
import { Product } from "../types";

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { fetchAllProducts } = useProductStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch and filter products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
        // Apply filtering after fetching
        setFilteredProducts(
          category
            ? products.filter((product) => product.category === category)
            : products,
        );
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally handle the error in your UI
      }
    };

    loadProducts();
  }, [fetchAllProducts, category]); // Add category to dependencies

  // Additional effect to handle category changes without refetching
  useEffect(() => {
    if (allProducts.length > 0) {
      setFilteredProducts(
        category
          ? allProducts.filter((product) => product.category === category)
          : allProducts,
      );
    }
  }, [category, allProducts]); // Only runs when category or allProducts changes

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Shop Our Collection"
        backgroundImage="https://via.placeholder.com/1200x400"
      />

      {/* Product List */}
      <section className="container mx-auto px-6 py-8">
        <ProductList products={filteredProducts} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;
