interface Product {
    id: string; // Unique identifier for each product
    category: string; // Category of the product (e.g., "Resin Product", "Purse and Wallet")
    name: string; // Name of the product
    description?: string; // Optional description of the product
    size?: string; // Size of the product (e.g., "15 cm", "21 cm")
    price: number; // Price of the product in Rs
    features?: string[]; // Optional features (e.g., "With light", "Without light")
    image?: string; // URL of the product image
  }