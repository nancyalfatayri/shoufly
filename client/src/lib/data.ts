import { Merchant, Product } from "@shared/schema";

export const merchants: Merchant[] = [
  {
    id: "tarabays",
    name: "Tarabay's Market",
    description: "Fresh groceries and everyday essentials",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    buttonColor: "blue"
  },
  {
    id: "coopdmit",
    name: "Coop Dmit",
    description: "Convenience store with general goods",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    buttonColor: "blue"
  },
  {
    id: "afran",
    name: "Afran AlBassam",
    description: "Traditional Lebanese bakery",
    image: "https://pixabay.com/get/g07a85babe398f982a8a1430e9df06cb4deb27eee055924d8b372699d3e3ce44502a0a99ba0e6bcd2da9ec808938c8b2bdd63133468d362daf25824cac185a74b_1280.jpg",
    buttonColor: "blue"
  },
  {
    id: "abirs",
    name: "Abir's Pharmacy",
    description: "Health and wellness products",
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    buttonColor: "blue"
  }
];

export const products: Product[] = [
  // Tarabay's Market products
  {
    id: "tarabays-1",
    name: "Fresh Apples (1kg)",
    price: "$4.99",
    merchantId: "tarabays"
  },
  {
    id: "tarabays-2",
    name: "Whole Wheat Bread",
    price: "$2.49",
    merchantId: "tarabays"
  },
  {
    id: "tarabays-3",
    name: "Organic Milk (1L)",
    price: "$3.29",
    merchantId: "tarabays"
  },
  // Coop Dmit products
  {
    id: "coopdmit-1",
    name: "Snack Mix Pack",
    price: "$6.99",
    merchantId: "coopdmit"
  },
  {
    id: "coopdmit-2",
    name: "AA Batteries (4-pack)",
    price: "$8.49",
    merchantId: "coopdmit"
  },
  {
    id: "coopdmit-3",
    name: "Tissue Box",
    price: "$3.99",
    merchantId: "coopdmit"
  },
  // Afran AlBassam products
  {
    id: "afran-1",
    name: "Za'atar Manoushe",
    price: "$4.50",
    merchantId: "afran"
  },
  {
    id: "afran-2",
    name: "Cheese Fatayer",
    price: "$5.25",
    merchantId: "afran"
  },
  {
    id: "afran-3",
    name: "Spinach Pie",
    price: "$4.75",
    merchantId: "afran"
  },
  // Abir's Pharmacy products
  {
    id: "abirs-1",
    name: "Vitamin C Tablets",
    price: "$12.99",
    merchantId: "abirs"
  },
  {
    id: "abirs-2",
    name: "First Aid Kit",
    price: "$24.99",
    merchantId: "abirs"
  },
  {
    id: "abirs-3",
    name: "Digital Thermometer",
    price: "$18.50",
    merchantId: "abirs"
  }
];
