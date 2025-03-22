// src/pages/HomePage.tsx
import React from "react";
import { allProducts } from "../sampleData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";

const HomePage: React.FC = () => {
  // Dynamically generate categories and their products
  const categories = Array.from(
    new Set(allProducts.map((product) => product.category)),
  );

  // Get the first 5 products for each category
  const categoryProducts = categories.map((category) => ({
    name: category,
    products: allProducts
      .filter((product) => product.category === category)
      .slice(0, 5), // Show first 5 products
  }));

  return (
    <div className="font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Discover Handmade Elegance & Sweet Indulgences"
        backgroundImage="https://via.placeholder.com/1200x400"
      />

      {/* Category Sliders */}
      <section className="container mx-auto px-6 py-8">
        {categoryProducts.map((category) => (
          <CategorySlider key={category.name} category={category} />
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
