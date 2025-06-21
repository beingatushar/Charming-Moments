// components/shared/ProductCard.tsx
import { Link } from 'react-router-dom';
import { Product } from '../types';
import clsx from 'clsx';
import useCartStore from '../stores/useCartStore';

interface ProductCardProps {
  product: Product;
  className?: string;
  imageClassName?: string;
  variant?: 'default' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  imageClassName = 'h-48',
  variant = 'default',
}) => {
  const { handleAddToCart } = useCartStore();
  return (
    <div
      className={clsx(
        'min-h-[350px] flex flex-col justify-between bg-white rounded-xl shadow-md overflow-hidden',
        'transition-transform duration-300 ease-in-out',
        'hover:shadow-lg hover:-translate-y-[10px]',
        className
      )}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden flex-shrink-0">
        <img
          loading="lazy"
          src={product.image}
          alt={product.name}
          className={clsx(
            'w-full object-cover transition-transform duration-300 group-hover:scale-105',
            imageClassName
          )}
        />
      </div>

      <div
        className={clsx(
          'p-3 rounded-2xl shadow-md bg-white grid grid-rows-[auto_1fr_auto] gap-4 transition-all',
          variant === 'compact' && 'p-2'
        )}
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors line-clamp-2">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-700 font-medium text-base">
            ₹{product.price}
          </p>

          {variant === 'default' && product?.features?.length! > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-gray-500 list-disc list-inside">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={clsx(
            'grid gap-2',
            variant === 'default' ? 'mt-4' : 'mt-3'
          )}
        >
          <Link
            to={`/product/${product.id}`}
            className="w-full text-center bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl text-sm font-semibold shadow-sm transition"
          >
            View Details
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="w-full text-center bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-xl text-sm font-semibold shadow-sm transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
