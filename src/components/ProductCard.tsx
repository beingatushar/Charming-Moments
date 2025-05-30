// components/shared/ProductCard.tsx
import { Link } from "react-router-dom";
import { Product } from "../types";
import clsx from "clsx";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
  imageClassName?: string;
  variant?: "default" | "compact";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = "",
  imageClassName = "h-48",
  variant = "default",
}) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg",
        variant === "default" && "hover:-translate-y-1",
        className,
      )}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={clsx(
            "w-full object-cover transition-transform duration-300 group-hover:scale-105",
            imageClassName,
          )}
        />
      </div>

      <div
        className={clsx(
          "p-5 flex flex-col justify-between",
          variant === "compact" && "p-4",
        )}
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-gray-600 font-medium">Rs {product.price}</p>

          {variant === "default" && product!.features!.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-gray-500">
              {product!.features!.map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={clsx(
            "flex flex-col gap-2",
            variant === "default" ? "mt-5" : "mt-3",
          )}
        >
          <Link
            to={`/product/${product.id}`}
            className="text-center bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md text-sm font-semibold transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="text-center bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
