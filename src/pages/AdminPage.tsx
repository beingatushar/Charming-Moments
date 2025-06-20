// src/pages/AdminPage.tsx

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Product } from '../types';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useProductStore } from '../stores/useProductStore';

// ProductForm Component
interface ProductFormProps {
  newProduct: Partial<Product>;
  isEditing: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  isEditing,
  onInputChange,
  onImageUpload,
  onSubmit,
  onCancel,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            label="Category"
            id="category"
            name="category"
            value={newProduct.category}
            onChange={onInputChange}
          />
          <InputField
            label="Product Name"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={onInputChange}
          />
          <InputField
            label="Price"
            id="price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={onInputChange}
          />
          {/* <InputField
            label="Stock"
            id="stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            onChange={onInputChange}
          /> */}
          <InputField
            label="Description"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={onInputChange}
          />
          <InputField
            label="Image URL"
            id="image"
            name="image"
            value={newProduct.image}
            onChange={onInputChange}
          />

          {/* Image Upload and Preview */}
          <ImageUploadField
            onImageUpload={onImageUpload}
            newProduct={newProduct}
          />

          <div className="col-span-full flex flex-col sm:flex-row gap-4">
            <SubmitButton isEditing={isEditing} loading={loading} />
            {isEditing && <CancelButton onCancel={onCancel} />}
          </div>
        </div>
      </form>
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>
);

const ImageUploadField: React.FC<{
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProduct: Partial<Product>;
}> = ({ onImageUpload, newProduct }) => (
  <>
    <div className="flex flex-col">
      <label
        htmlFor="image-upload"
        className="text-sm font-medium text-gray-700 mb-1"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={onImageUpload}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </div>

    {newProduct.image && (
      <div className="col-span-full">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Image Preview
        </label>
        <img
          loading="lazy"
          src={newProduct.image}
          alt="Product Preview"
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
    )}
  </>
);

const SubmitButton: React.FC<{ isEditing: boolean; loading: boolean }> = ({
  isEditing,
  loading,
}) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full sm:w-auto ${loading ? 'bg-pink-300' : 'bg-pink-500'} text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300`}
  >
    {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
  </button>
);

const CancelButton: React.FC<{ onCancel: () => void }> = ({ onCancel }) => (
  <button
    type="button"
    onClick={onCancel}
    className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
  >
    Cancel
  </button>
);
// Define InputFieldProps interface for the reusable input component
interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

// Define ProductTableProps interface for the product table
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}
const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {/* <th className="px-4 py-2 text-left">ID</th> */}
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Price</th>
              {/* <th className="px-4 py-2 text-left">Stock</th> */}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
              >
                <td className="px-4 py-2">
                  {product.image && (
                    <img
                      loading="lazy"
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </td>
                {/* <td className="px-4 py-2">{product.id}</td> */}
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">Rs {product.price}</td>
                {/* <td className="px-4 py-2">{product.stock}</td> */}

                <td className="px-4 py-2 space-x-2">
                  <Link
                    onClick={() => onEdit(product)}
                    className="text-purple-500 hover:transition duration-300 hover:bg-purple-500 hover:text-white hover:rounded p-1"
                    to={`/product/${product.id}`}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-500 hover:transition duration-300 hover:bg-blue-500 hover:text-white hover:rounded p-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-500 transition duration-300 hover:bg-red-500 hover:text-white hover:rounded py-1 px-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Admin Page Component
const AdminPage: React.FC = () => {
  const {
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  } = useProductStore();

  const initialProduct = () => ({
    category: '',
    name: '',
    description: '',
    price: 0,
    // stock: 0,
    image: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] =
    useState<Partial<Product>>(initialProduct());
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const loadingToast = toast.loading('Loading products...');
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
        toast.success('Products loaded successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch products.');
      } finally {
        toast.dismiss(loadingToast);
      }
    };
    setLoading(true);
    loadProducts();
    setLoading(false);
  }, [fetchAllProducts]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadingToast = toast.loading('Uploading image...');
    try {
      const imageUrl = await uploadImage(file);
      setNewProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
      toast.success('Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed.');
    } finally {
      toast.dismiss(uploadingToast);
    }
  };

  const validateProduct = (): boolean => {
    if (!newProduct.name?.trim())
      return toast.error('Product name is required'), false;
    if (!newProduct.category?.trim())
      return toast.error('Category is required'), false;
    if (!newProduct.price || newProduct.price <= 0)
      return toast.error('Price must be greater than 0'), false;
    // if (newProduct.stock === undefined || newProduct.stock < 0)
    //   return toast.error("Stock must be 0 or greater"), false;
    return true;
  };

  const handleAddOrUpdateProduct = async () => {
    if (!validateProduct()) return;

    const savingToast = toast.loading(
      isEditing ? 'Updating product...' : 'Adding product...'
    );

    try {
      if (isEditing && editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          newProduct
        );
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === editingProductId ? updatedProduct : p
          )
        );
        toast.success('Product updated successfully!');
      } else {
        const productWithId = { ...newProduct, id: `temp-${Date.now()}` };
        const createdProduct = await createProduct(productWithId);
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        toast.success('Product added successfully!');
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save product.');
    } finally {
      toast.dismiss(savingToast);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    const deletingToast = toast.loading('Deleting product...');

    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product.');
    } finally {
      toast.dismiss(deletingToast);
    }
  };

  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  const resetForm = () => {
    setNewProduct(initialProduct());
    setIsEditing(false);
    setEditingProductId(null);
  };

  return (
    <>
      <Header />
      <HeroSection
        title="Admin Panel"
        backgroundImage="https://source.unsplash.com/featured/?technology"
      />
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
          <ProductForm
            newProduct={newProduct}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleAddOrUpdateProduct}
            onCancel={resetForm}
          />
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
