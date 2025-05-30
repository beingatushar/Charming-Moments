// components/CategorySlider.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Product } from '../types';
import clsx from 'clsx';
import { ProductCard } from './ProductCard';

interface CategorySliderProps {
  category: {
    name: string;
    products: Product[];
  };
  onAddToCart: (product: Product) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  category,
  onAddToCart,
}) => {
  const navButtonStyles =
    'absolute top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300';

  return (
    <div className="font-sans px-4 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {category.name.replace(/-/g, ' ')}
        </h2>
        <Link
          to={`/shop?category=${category.name}`}
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
            nextEl: `.next-button-${category.name}`,
            prevEl: `.prev-button-${category.name}`,
          }}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {category.products.map((product) => (
            <SwiperSlide key={product.id} className="py-4 rounded-4xl">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                variant="compact"
                imageClassName="h-40"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
