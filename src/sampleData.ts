// src/sampleData.ts
export interface Product {
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
  }
  
  export const resinProducts: Product[] = [
    {
      id: "resin-1",
      category: "Resin Product",
      name: "15 cm Resin Bookmark",
      price: 200,
      size: "15 cm",
      image: "https://picsum.photos/150",
    },
    {
      id: "resin-2",
      category: "Resin Product",
      name: "15 cm Pooja Thali",
      price: 350,
      size: "15 cm",
      image: "https://picsum.photos/175",
    },
    // Add more resin products as needed
  ];
  
  export const purseAndWalletProducts: Product[] = [
    {
      id: "purse-1",
      category: "Purse and Wallet",
      name: "23×15 cm Pearls Purse",
      price: 1000,
      size: "23×15 cm",
      image: "https://picsum.photos/200",
    },
    {
      id: "purse-2",
      category: "Purse and Wallet",
      name: "20×17 cm Potli Purse",
      price: 1500,
      size: "20×17 cm",
      image: "https://picsum.photos/225",
    },
    // Add more purse and wallet products as needed
  ];