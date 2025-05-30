import { create } from 'zustand';
import { ApiError, Product } from '../types';
import axios, { AxiosError } from 'axios';

interface ProductStore {
  loading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<Product[]>;
  findById: (id: string) => Promise<Product>;
  uploadImage: (imageFile: File) => Promise<string>;
  deleteProduct: (id: string) => Promise<string>;
  updateProduct: (
    id: string,
    updatedProduct: Partial<Product>
  ) => Promise<Product>;
  createProduct: (newProduct: Partial<Product>) => Promise<Product>;
}

// Helper function for error handling
const handleApiError = (error: unknown): string => {
  // Check if the error is an instance of AxiosError
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiError>;
    return err.response?.data?.message || err.message;
  }
  // Fallback for non-Axios errors (in case an unexpected error is thrown)
  return 'An unknown error occurred';
};

const useProductStore = create<ProductStore>((set) => ({
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product[]>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`
      );
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },

  findById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Product>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },

  createProduct: async (newProduct: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      const productToCreate = newProduct.id
        ? newProduct
        : { ...newProduct, id: 'temp-here' };
      const response = await axios.post<Product>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        productToCreate
      );
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },

  updateProduct: async (id: string, updatedProduct: Partial<Product>) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put<Product>(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        updatedProduct
      );
      set({ loading: false });
      return response.data;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },

  deleteProduct: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
      );
      set({ loading: false });
      return `Product ${id} deleted successfully`;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },

  uploadImage: async (imageFile: File) => {
    set({ loading: true, error: null });
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const CLOUDINARY_API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

    const uniqueUploadId = `uqid-${Date.now()}`;
    const totalChunks = Math.ceil(imageFile.size / CHUNK_SIZE);

    const uploadChunk = async (start: number, end: number): Promise<any> => {
      const formData = new FormData();
      formData.append('file', imageFile.slice(start, end));
      formData.append('cloud_name', CLOUD_NAME);
      formData.append('upload_preset', UPLOAD_PRESET);
      const contentRange = `bytes ${start}-${end - 1}/${imageFile.size}`;

      try {
        const response = await axios.post(
          `${CLOUDINARY_API_URL}/${CLOUD_NAME}/auto/upload`,
          formData,
          {
            headers: {
              'X-Unique-Upload-Id': uniqueUploadId,
              'Content-Range': contentRange,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data;
      } catch (error: unknown) {
        throw new Error(handleApiError(error));
      }
    };

    try {
      // Use a for loop to handle chunk uploads sequentially
      let currentChunk = 0;
      let uploadResult: any;

      for (let i = 0; i < totalChunks; i++) {
        const start = currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, imageFile.size);
        uploadResult = await uploadChunk(start, end);
        currentChunk++;
      }

      set({ loading: false });
      return uploadResult.secure_url;
    } catch (error: unknown) {
      set({ error: handleApiError(error), loading: false });
      throw new Error(handleApiError(error));
    }
  },
}));

export default useProductStore;
