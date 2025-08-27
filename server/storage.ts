import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

// Sample data for merchants and products
export const sampleMerchants = [
  {
    id: 'abir-pharmacy',
    name: "Abir's Pharmacy",
    description: "Your trusted neighborhood pharmacy with quality medications and health products",
    image: "/api/placeholder/300/200",
    buttonColor: 'blue' as const
  },
  {
    id: 'tarabay-market', 
    name: "Tarabay's Market",
    description: "Fresh groceries and daily essentials delivered to your door",
    image: "/api/placeholder/300/200",
    buttonColor: 'green' as const
  },
  {
    id: 'coop-dmit',
    name: "Coop Dmit", 
    description: "General store with household items, snacks, and convenience products",
    image: "/api/placeholder/300/200",
    buttonColor: 'blue' as const
  },
  {
    id: 'afran-manakish',
    name: "Afran Al Bassam",
    description: "Authentic Lebanese manakish and traditional breakfast items", 
    image: "/api/placeholder/300/200",
    buttonColor: 'green' as const
  }
];

export const sampleProducts = [
  // Abir's Pharmacy
  { id: 'vitamins-c', name: 'Vitamin C Tablets', price: '$12.99', merchantId: 'abir-pharmacy' },
  { id: 'first-aid-kit', name: 'First Aid Kit', price: '$24.99', merchantId: 'abir-pharmacy' },
  { id: 'thermometer', name: 'Digital Thermometer', price: '$15.99', merchantId: 'abir-pharmacy' },
  
  // Tarabay's Market
  { id: 'fresh-apples', name: 'Fresh Red Apples (1kg)', price: '$3.99', merchantId: 'tarabay-market' },
  { id: 'whole-milk', name: 'Whole Milk (1L)', price: '$2.49', merchantId: 'tarabay-market' },
  { id: 'bread-loaf', name: 'Fresh Bread Loaf', price: '$1.99', merchantId: 'tarabay-market' },
  
  // Coop Dmit
  { id: 'batteries-aa', name: 'AA Batteries (Pack of 4)', price: '$5.99', merchantId: 'coop-dmit' },
  { id: 'tissues', name: 'Facial Tissues', price: '$3.49', merchantId: 'coop-dmit' },
  { id: 'snack-chips', name: 'Potato Chips', price: '$2.99', merchantId: 'coop-dmit' },
  
  // Afran Al Bassam
  { id: 'cheese-manakish', name: 'Cheese Manakish', price: '$4.99', merchantId: 'afran-manakish' },
  { id: 'zaatar-manakish', name: 'Zaatar Manakish', price: '$3.99', merchantId: 'afran-manakish' },
  { id: 'meat-manakish', name: 'Meat Manakish', price: '$6.99', merchantId: 'afran-manakish' }
];
