import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useProductStore } from '../stores/useProductStore';

interface CategorySliderProps {
  category: string;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);

  useEffect(() => {
    // let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchAllProducts({
          categories: [category],
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;

  return (
    <div className="font-sans px-4 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {category.replace(/-/g, ' ')}
        </h2>
        <Link
          to={`/shop?categories=${encodeURI(category)}`}
          className="text-pink-500 hover:text-pink-700"
        >
          View All
        </Link>
      </div>
      <div className="relative">
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          navigation={{
            nextEl: `.next-button-${category}`,
            prevEl: `.prev-button-${category}`,
          }}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="py-4 rounded-4xl">
              <ProductCard product={product} variant="compact" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
