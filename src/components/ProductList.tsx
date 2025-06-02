import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import Spinner from './Spinner';
import { ProductCard } from './ProductCard';
import { useCart } from '../hooks/useCart';
import { useProduct } from '../hooks/useProduct';
import { Product, ProductSortOption } from '../types';

const SORT_OPTIONS: { label: string; value: ProductSortOption | 'default' }[] =
  [
    { value: 'default', label: 'Sort By Default' },
    { value: 'price-low-to-high', label: 'Price: Low to High' },
    { value: 'price-high-to-low', label: 'Price: High to Low' },
    { value: 'date-added-newest', label: 'Date Added: Newest' },
    { value: 'date-added-oldest', label: 'Date Added: Oldest' },
    { value: 'rating-high-to-low', label: 'Rating: High to Low' },
    { value: 'name-a-z', label: 'Name: A-Z' },
    { value: 'name-z-a', label: 'Name: Z-A' },
  ];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchAllProducts, getAllCategories, loading } = useProduct();
  useCart();

  const sortBy = searchParams.get('sortBy') || '';
  const selectedCategories = useMemo(() => {
    const value = searchParams.get('categories');
    return value ? value.split(',') : [];
  }, [searchParams]);

  const updateSearchParams = useCallback(
    (key: string, value?: string | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const toggleCategory = useCallback(
    (category: string) => {
      const newSelected = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

      updateSearchParams(
        'categories',
        newSelected.length > 0 ? newSelected.join(',') : null
      );
    },
    [selectedCategories, updateSearchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      updateSearchParams('sortBy', value === 'default' ? null : value);
    },
    [updateSearchParams]
  );

  useEffect(() => {
    getAllCategories().then(setCategories).catch(console.error);
  }, [getAllCategories]);

  useEffect(() => {
    fetchAllProducts({
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      sortBy: sortBy as ProductSortOption,
    })
      .then(setProducts)
      .catch(console.error);
  }, [fetchAllProducts, selectedCategories, sortBy]);

  const getCategoryButtonClass = (isSelected: boolean) =>
    clsx(
      'px-5 py-2 text-sm font-medium rounded-full transition duration-300',
      isSelected
        ? 'bg-pink-600 text-white shadow-lg'
        : 'bg-gray-100 text-gray-700 hover:bg-pink-500 hover:text-white'
    );

  const renderCategoryButton = (
    label: string,
    isSelected: boolean,
    onClick: () => void
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={getCategoryButtonClass(isSelected)}
      aria-pressed={isSelected}
    >
      {label}
    </button>
  );

  if (loading) return <Spinner />;

  return (
    <div className="font-sans px-4 py-8 max-w-7xl mx-auto">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {renderCategoryButton('All', selectedCategories.length === 0, () =>
          updateSearchParams('categories', null)
        )}
        {categories.map((category) =>
          renderCategoryButton(
            category.replace(/-/g, ' '),
            selectedCategories.includes(category),
            () => toggleCategory(category)
          )
        )}
      </div>

      {/* Sorting Filters */}
      <div className="flex justify-center mb-10">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-2 w-60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
