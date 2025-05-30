export interface Product {
  dateAdded?: string;
  id: string;
  category: string;
  name: string;
  description?: string;
  size?: string;
  price: number;
  features?: string[];
  image?: string;
  stock?: number;
  rating?: number;
  tags?: string[];
  material?: string;
  isDeleted: boolean;
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface ApiError {
  message: string;
}
