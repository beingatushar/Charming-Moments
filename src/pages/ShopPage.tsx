// src/pages/ShopPage.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import useProductStore from "../store/productStore";

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { products: allProducts } = useProductStore();
  // Filter products based on category
  const filteredProducts = category
    ? allProducts.filter((product) => product.category === category)
    : allProducts;

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
