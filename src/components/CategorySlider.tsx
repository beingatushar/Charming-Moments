import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { Product } from '../sampleData';

interface CategorySliderProps {
  category: {
    name: string;
    products: Product[];
  };
}

const CategorySlider: React.FC<CategorySliderProps> = ({ category }) => {
  return (
    <div className="mb-12">
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
          slidesPerView={2} // Default for mobile
          navigation={{
            nextEl: `.next-button-${category.name}`,
            prevEl: `.prev-button-${category.name}`,
          }}
          modules={[Navigation]}
          breakpoints={{
            // For tablets (640px and above)
            640: {
              slidesPerView: 2, // 2 columns, 1 row
            },
            // For medium devices (768px and above)
            768: {
              slidesPerView: 3, // 3 columns, 1 row
            },
            // For large devices (1024px and above)
            1024: {
              slidesPerView: 4, // 4 columns, 1 row
            },
          }}
        >
          {category.products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">Price: Rs {product.price}</p>
                  <Link
                    to={`/shop?category=${category.name}`}
                    className="mt-4 inline-block bg-pink-500 text-white px-4 py-2 rounded-lg"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <button
          className={`absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 prev-button-${category.name}`}
        >
          &larr;
        </button>
        <button
          className={`absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 next-button-${category.name}`}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;