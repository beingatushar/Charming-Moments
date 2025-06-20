import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CategorySlider from '../components/CategorySlider';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner'; // Ensure Spinner is imported
import { useProductStore } from '../stores/useProductStore';

const HomePage: React.FC = () => {
  // Destructure and provide better names for clarity
  const getAllCategories = useProductStore((state) => state.getAllCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  // Fetch products and handle loading
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categories = await getAllCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
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
          allCategories.map((category) => (
            <CategorySlider key={category} category={category} />
          ))
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
