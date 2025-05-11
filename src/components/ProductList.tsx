// components/ProductList.tsx
import { Link, useSearchParams } from "react-router-dom";
import useCartStore from "../store/cartStore";
import toast from "react-hot-toast";
import { Product } from "../types";
import useProductStore from "../store/productStore";
import Spinner from "./Spinner";
import { useCallback, useMemo } from "react";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { loading } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCartStore();

  const sortBy = searchParams.get("sortBy") || "default";
  const selectedCategory = searchParams.get("category") || null;

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products],
  );

  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low-to-high":
          return a.price - b.price;
        case "price-high-to-low":
          return b.price - a.price;
        case "date-added-newest":
          return (
            new Date(b.dateAdded || "").getTime() -
            new Date(a.dateAdded || "").getTime()
          );
        case "date-added-oldest":
          return (
            new Date(a.dateAdded || "").getTime() -
            new Date(b.dateAdded || "").getTime()
          );
        case "rating-high-to-low":
          return (b.rating || 0) - (a.rating || 0);
        case "name-a-z":
          return a.name.localeCompare(b.name);
        case "name-z-a":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleSortChange = useCallback(
    (value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (value === "default") {
        newParams.delete("sortBy");
      } else {
        newParams.set("sortBy", value);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (category === null) {
        newParams.delete("category");
      } else {
        newParams.set("category", category);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || "https://via.placeholder.com/150",
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    },
    [addToCart],
  );

  if (loading) return <Spinner />;

  return (
    <div className="font-sans px-4 py-8 max-w-7xl mx-auto">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-5 py-2 text-sm font-medium rounded-full transition duration-300 ${
            !selectedCategory
              ? "bg-pink-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition duration-300 ${
              selectedCategory === category
                ? "bg-pink-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white"
            }`}
          >
            {category.replace(/-/g, " ")}
          </button>
        ))}
      </div>

      {/* Sorting Filters */}
      <div className="flex justify-center mb-10">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        >
          <option value="default">Sort By Default</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="date-added-newest">Date Added: Newest</option>
          <option value="date-added-oldest">Date Added: Oldest</option>
          <option value="rating-high-to-low">Rating: High to Low</option>
          <option value="name-a-z">Name: A-Z</option>
          <option value="name-z-a">Name: Z-A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;