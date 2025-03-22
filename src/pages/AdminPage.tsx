import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Product } from "..";


const AdminPage: React.FC = () => {
  // State for managing products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      category: "Accessories",
      name: "Resin Bookmark",
      description: "Handmade resin bookmark with floral designs.",
      price: 200,
      stock: 10,
      image: "https://example.com/resin-bookmark.jpg",
      rating: 4.5,
      tags: ["handmade", "resin", "bookmark"],
      material: "Resin",
    },
    {
      id: "2",
      category: "Food",
      name: "Handmade Chocolate Box",
      description: "Assorted handmade chocolates in a decorative box.",
      price: 500,
      stock: 15,
      image: "https://example.com/chocolate-box.jpg",
      rating: 4.7,
      tags: ["chocolate", "handmade", "gift"],
    },
    {
      id: "3",
      category: "Home Decor",
      name: "Scented Soy Candle",
      description: "Eco-friendly soy candle with lavender scent.",
      price: 300,
      stock: 20,
      image: "https://example.com/soy-candle.jpg",
      rating: 4.8,
      tags: ["candle", "eco-friendly", "lavender"],
    },
  ]);

  // State for adding/editing a product
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
  });

  // State to track if we're editing an existing product
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Function to handle image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to add or update a product
  const handleAddOrUpdateProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.price > 0 &&
      newProduct.stock !== undefined &&
      newProduct.stock >= 0
    ) {
      if (isEditing && editingProductId) {
        // Update existing product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProductId
              ? { ...product, ...newProduct }
              : product
          )
        );
        setIsEditing(false);
        setEditingProductId(null);
      } else {
        // Add new product
        const newId = (products.length + 1).toString(); // Generate a new ID
        setProducts([...products, { ...newProduct, id: newId } as Product]);
      }
      // Reset form
      setNewProduct({
        category: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
      });
    }
  };

  // Function to delete a product
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Function to populate form for editing
  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  };

  return (
    <>
      <Header />
      <HeroSection title={"Admin Panel"} backgroundImage={""} />
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        {/* Admin Panel Content */}
        <main className="container px-4 sm:px-6 lg:px-8 py-12 flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

          {/* Add/Edit Product Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              {newProduct.image && (
                <div className="col-span-full">
                  <img
                    src={newProduct.image}
                    alt="Product Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
              <button
                onClick={handleAddOrUpdateProduct}
                className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition duration-300"
              >
                {isEditing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Manage Products
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                    >
                      <td className="px-4 py-2">{product.id}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">Rs {product.price}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                      <td className="px-4 py-2">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-500 hover:text-blue-700 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 transition duration-300"
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
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;