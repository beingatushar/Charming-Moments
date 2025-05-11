import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import useProductStore from "../store/productStore";
import Spinner from "../components/Spinner"; // Ensure Spinner is imported
import { Product } from "../types";

const HomePage: React.FC = () => {
  // Destructure and provide better names for clarity
  const { fetchAllProducts, loading } = useProductStore();
  const { addToCart } = useCartStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Fetch products and handle loading
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products. Please try again.");
      }
    };

    loadProducts();
  }, [fetchAllProducts]);

  // Dynamically generate unique categories
  const categories = Array.from(
    new Set(allProducts.map((product) => product.category)),
  );

  // Organize products into categories and limit to 5 products per category
  const categoryProducts = categories.map((category) => ({
    name: category,
    products: allProducts
      .filter((product) => product.category === category)
      .slice(0, 5),
  }));

  // Handle adding products to the cart
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "https://via.placeholder.com/150", // Default placeholder image
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="font-sans">
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Discover Handmade Elegance & Sweet Indulgences"
        backgroundImage="https://via.placeholder.com/1200x400"
      />

      <section className="container mx-auto px-6 py-8">
        {/* Show a loading spinner while products are being fetched */}
        {loading ? (
          <Spinner />
        ) : (
          // Render category sliders dynamically
          categoryProducts.map((category) => (
            <CategorySlider
              key={category.name}
              category={category}
              onAddToCart={handleAddToCart} // Pass down the add to cart handler
            />
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
