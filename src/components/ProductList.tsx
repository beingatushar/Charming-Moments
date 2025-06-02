// components/ProductList.tsx
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Product } from '../types';
import Spinner from './Spinner';
import { useCallback, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import clsx from 'clsx';
import { useCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { loading } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();
  const { handleAddToCart } = useCart();

  const sortBy = searchParams.get('sortBy') || 'default';
  const selectedCategory = searchParams.get('category');

  // Unique categories from products
  const categories = useMemo(
    () => Array.from(new Set(products.map(({ category }) => category))),
    [products]
  );

  // Filter by selected category or show all
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);

  // Sort filtered products based on selected sortBy option
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        case 'date-added-newest':
          return (
            new Date(b.dateAdded || '').getTime() -
            new Date(a.dateAdded || '').getTime()
          );
        case 'date-added-oldest':
          return (
            new Date(a.dateAdded || '').getTime() -
            new Date(b.dateAdded || '').getTime()
          );
        case 'rating-high-to-low':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Helper to update query params
  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSortChange = useCallback(
    (value: string) =>
      updateSearchParams('sortBy', value === 'default' ? null : value),
    [updateSearchParams]
  );

  const handleCategoryChange = useCallback(
    (category: string | null) => updateSearchParams('category', category),
    [updateSearchParams]
  );

  if (loading) return <Spinner />;

  // Returns the button classes based on selection
  const getCategoryButtonClass = (isSelected: boolean) =>
    clsx(
      'px-5 py-2 text-sm font-medium rounded-full transition duration-300',
      isSelected
        ? 'bg-pink-600 text-white shadow-lg'
        : 'bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white'
    );

  return (
    <div className="font-sans px-4 py-8 max-w-7xl mx-auto">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          type="button"
          onClick={() => handleCategoryChange(null)}
          className={getCategoryButtonClass(!selectedCategory)}
          aria-pressed={!selectedCategory}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryChange(category)}
            className={getCategoryButtonClass(selectedCategory === category)}
            aria-pressed={selectedCategory === category}
          >
            {category.replace(/-/g, ' ')}
          </button>
        ))}
      </div>

      {/* Sorting Filters */}
      <div className="flex justify-center mb-10">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          aria-label="Sort products"
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
