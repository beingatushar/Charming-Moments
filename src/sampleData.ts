import { Product } from ".";

// Helper function to generate random IDs
const generateId = (prefix: string, index: number) => `${prefix}-${index + 1}`;

// Helper function to generate random prices
const generatePrice = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate random ratings
const generateRating = () =>
  parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1));

// Helper function to generate random stock
const generateStock = () => Math.floor(Math.random() * 20) + 1;

// Helper function to generate random images
const generateImage = (seed: number) =>
  `https://picsum.photos/seed/${seed}/200`;

// Product name generators
const purseNames = [
  "Pearls Purse",
  "Potli Purse",
  "Embroidered Purse",
  "Beaded Purse",
  "Velvet Purse",
  "Sequined Purse",
  "Leather Wallet",
  "Silk Purse",
  "Compact Coin Purse",
  "Designer Clutch",
];

const chocolateNames = [
  "Dark Chocolate Box",
  "Milk Chocolate Truffles",
  "Assorted Chocolate Pack",
  "White Chocolate Bar",
  "Hazelnut Chocolate",
  "Caramel Chocolate",
  "Fruit & Nut Chocolate",
  "Organic Chocolate",
  "Gourmet Chocolate",
  "Chocolate Gift Hamper",
];

const resinNames = [
  "Resin Bookmark",
  "Pooja Thali",
  "Resin Showpiece",
  "Resin Coaster Set",
  "Resin Keychain",
  "Resin Wall Art",
  "Resin Jewelry Box",
  "Resin Photo Frame",
  "Resin Candle Holder",
  "Resin Pen Stand",
];

const candleNames = [
  "Scented Soy Candle",
  "Lavender Candle",
  "Vanilla Candle",
  "Citrus Candle",
  "Jasmine Candle",
  "Rose Candle",
  "Sandalwood Candle",
  "Ocean Breeze Candle",
  "Cinnamon Candle",
  "Floral Candle Set",
];

// Generate products for a category
const generateProducts = (
  category: string,
  names: string[],
  minPrice: number,
  maxPrice: number,
): Product[] => {
  return names.map((name, index) => ({
    id: generateId(category.split(" ")[0].toLowerCase(), index),
    category: category.toLowerCase().replace(/ /g, "-"),
    name,
    description: `A beautiful ${name.toLowerCase()} for your daily use.`,
    size: `${Math.floor(Math.random() * 30) + 10} cm`,
    price: generatePrice(minPrice, maxPrice),
    features: ["Handmade", "Eco-friendly", "Unique Design"],
    image: generateImage(index),
    stock: generateStock(),
    rating: generateRating(),
    // tags: ["new", "popular", "best-seller"][Math.floor(Math.random() * 3)],
    material: ["Resin", "Fabric", "Leather", "Wax"][
      Math.floor(Math.random() * 4)
    ],
  }));
};

// Generate products for each category
export const purseAndWalletProducts: Product[] = generateProducts(
  "Purse and Wallet",
  purseNames,
  500,
  1500,
);

export const chocolateProducts: Product[] = generateProducts(
  "Chocolate",
  chocolateNames,
  200,
  800,
);

export const resinProducts: Product[] = generateProducts(
  "Resin Product",
  resinNames,
  150,
  1200,
);

export const candleProducts: Product[] = generateProducts(
  "Candles",
  candleNames,
  100,
  500,
);

// Combine all products into a single array
export const allProducts: Product[] = [
  ...purseAndWalletProducts,
  ...chocolateProducts,
  ...resinProducts,
  ...candleProducts,
];

export type { Product };
