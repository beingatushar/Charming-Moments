import { create } from "zustand";
import { Product } from "../types";
import { BACKEND_URL } from "../constants";
import axios, { AxiosError } from "axios";

interface ProductStore {
  loading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<Product[]>;
  findById: (id: string) => Promise<Product>;
  deleteProduct: (id: string) => Promise<string>;
  updateProduct: (
    id: string,
    updatedProduct: Partial<Product>,
  ) => Promise<Product>;
  createProduct: (newProduct: Partial<Product>) => Promise<Product>;
}

interface ApiError {
  message: string;
}

const useProductStore = create<ProductStore>((set) => ({
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product[]>(
        `${BACKEND_URL}/api/products`,
      );
      set({ loading: false });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  findById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product>(
        `${BACKEND_URL}/api/products/${id}`,
      );
      set({ loading: false });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  createProduct: async (newProduct: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      // If no ID provided, let the backend generate one
      const productToCreate = newProduct.id
        ? newProduct
        : { ...newProduct, id: "temp-here" };

      const response = await axios.post<Product>(
        `${BACKEND_URL}/api/products`,
        productToCreate,
      );
      set({ loading: false });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateProduct: async (id: string, updatedProduct: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<Product>(
        `${BACKEND_URL}/api/products/${id}`,
        updatedProduct,
      );
      set({ loading: false });
      return response.data;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`);
      set({ loading: false });
      return `Product ${id} deleted successfully`;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));

export default useProductStore;
