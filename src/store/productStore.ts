import { create } from "zustand";
import { Product } from "../types";
import { BACKEND_URL } from "../constants";
import axios, { AxiosError } from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

interface ProductStore {
  loading: boolean;
  error: string | null;
  fetchAllProducts: () => Promise<Product[]>;
  findById: (id: string) => Promise<Product>;
  uploadImage: (imageFile: File) => Promise<string>; // New method
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
  uploadImage: async (imageFile: File) => {
    set({ loading: true, error: null });

    // Configuration - move these to environment variables in production
    const CLOUD_NAME = "dxa3titlk";
    const UPLOAD_PRESET = "ffdwxgii";
    const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

    try {
      const uniqueUploadId = `uqid-${Date.now()}`;
      const totalChunks = Math.ceil(imageFile.size / CHUNK_SIZE);
      let currentChunk = 0;

      const uploadChunk = async (start: number, end: number): Promise<any> => {
        const formData = new FormData();
        formData.append("file", imageFile.slice(start, end));
        formData.append("cloud_name", CLOUD_NAME);
        formData.append("upload_preset", UPLOAD_PRESET);
        const contentRange = `bytes ${start}-${end - 1}/${imageFile.size}`;

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            formData,
            {
              headers: {
                "X-Unique-Upload-Id": uniqueUploadId,
                "Content-Range": contentRange,
                "Content-Type": "multipart/form-data",
              },
            },
          );

          currentChunk++;

          if (currentChunk < totalChunks) {
            const nextStart = currentChunk * CHUNK_SIZE;
            const nextEnd = Math.min(nextStart + CHUNK_SIZE, imageFile.size);
            return uploadChunk(nextStart, nextEnd);
          } else {
            // Final chunk uploaded, return the response
            return response.data;
          }
        } catch (error) {
          const err = error as AxiosError<ApiError>;
          const errorMessage = err.response?.data?.message || err.message;
          throw new Error(errorMessage);
        }
      };

      // Start the chunked upload
      const start = 0;
      const end = Math.min(CHUNK_SIZE, imageFile.size);
      const result = await uploadChunk(start, end);

      set({ loading: false });
      return result.secure_url;
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      const errorMessage = err.response?.data?.message || err.message;
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));

export default useProductStore;
