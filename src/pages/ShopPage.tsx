import React, { useEffect, useState, useMemo } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products and handle errors
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("There was an issue fetching the products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchAllProducts]);

  // Memoized filtered products based on category
  const filteredProducts = useMemo(
    () =>
      category
        ? allProducts.filter((product) => product.category === category)
        : allProducts,
    [category, allProducts],
  );

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
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopPage;
