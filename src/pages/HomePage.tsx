import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import useProductStore from "../store/productStore";
import Spinner from "../components/Spinner"; // Make sure Spinner is imported
import { Product } from "../types";

const HomePage: React.FC = () => {
  const { fetchAllProducts, loading } = useProductStore(); // Include loading
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [fetchAllProducts]);

  // Dynamically generate categories and their products
  const categories = Array.from(
    new Set(allProducts.map((product) => product.category)),
  );

  const categoryProducts = categories.map((category) => ({
    name: category,
    products: allProducts
      .filter((product) => product.category === category)
      .slice(0, 5),
  }));

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

  return (
    <div className="font-sans">
      <Header />
      <HeroSection
        title="Discover Handmade Elegance & Sweet Indulgences"
        backgroundImage="https://via.placeholder.com/1200x400"
      />
      <section className="container mx-auto px-6 py-8">
        {loading ? (
          <Spinner />
        ) : (
          categoryProducts.map((category) => (
            <CategorySlider
              key={category.name}
              category={category}
              handleAddToCart={(product) => handleAddToCart(product)}
            />
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
