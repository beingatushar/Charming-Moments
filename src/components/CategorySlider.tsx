import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Product } from "../types";
import clsx from "clsx"; // For cleaner conditional class management

interface CategorySliderProps {
  category: {
    name: string;
    products: Product[];
  };
  handleAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<{
  product: Product;
  handleAddToCart: (product: Product) => void;
}> = ({ product, handleAddToCart }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden gap-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">Price: Rs {product.price}</p>
        <div className="flex flex-col gap-2 mt-5">
                <Link
                  to={`/product/${product.id}`}
                  className="text-center bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md text-sm font-semibold transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-center bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md text-sm font-semibold transition"
                >
                  Add to Cart
                </button>
              </div>
      </div>
    </div>
  );
};

const CategorySlider: React.FC<CategorySliderProps> = ({
  category,
  handleAddToCart,
}) => {
  const navButtonStyles =
    "absolute top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300";

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {category.name.replace(/-/g, " ")}
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
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={clsx(navButtonStyles, `prev-button-${category.name}`)}
        >
          &larr;
        </button>
        <button
          className={clsx(navButtonStyles, `next-button-${category.name}`)}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
