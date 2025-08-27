import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required');
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

// Sample data for merchants and products with bilingual support
export const sampleMerchants = [
  {
    id: 'abir-pharmacy',
    name: "Abir's Pharmacy",
    nameAr: "صيدلية عبير",
    description: "Your trusted neighborhood pharmacy with quality medications and health products",
    descriptionAr: "صيدليتك المحلية الموثوقة مع الأدوية عالية الجودة والمنتجات الصحية",
    image: "/api/placeholder/300/200",
    buttonColor: 'blue' as const
  },
  {
    id: 'tarabay-market', 
    name: "Tarabay's Market",
    nameAr: "سوق الطرابيي",
    description: "Fresh groceries and daily essentials delivered to your door",
    descriptionAr: "بقالة طازجة والأساسيات اليومية مع التوصيل إلى باب منزلك",
    image: "/api/placeholder/300/200",
    buttonColor: 'green' as const
  },
  {
    id: 'coop-dmit',
    name: "Coop Dmit", 
    nameAr: "كوب دميت",
    description: "General store with household items, snacks, and convenience products",
    descriptionAr: "متجر عام مع المستلزمات المنزلية والوجبات الخفيفة ومنتجات الراحة",
    image: "/api/placeholder/300/200",
    buttonColor: 'blue' as const
  },
  {
    id: 'afran-manakish',
    name: "Afran Al Bassam",
    nameAr: "أفران البسام",
    description: "Authentic Lebanese manakish and traditional breakfast items", 
    descriptionAr: "مناقيش لبنانية أصيلة وأصناف الفطار التقليدية",
    image: "/api/placeholder/300/200",
    buttonColor: 'green' as const
  }
];

export const sampleProducts = [
  // Abir's Pharmacy
  { id: 'vitamins-c', name: 'Vitamin C Tablets', nameAr: 'أقراص فيتامين سي', price: '$12.99', merchantId: 'abir-pharmacy' },
  { id: 'first-aid-kit', name: 'First Aid Kit', nameAr: 'صندوق الإسعافات الأولية', price: '$24.99', merchantId: 'abir-pharmacy' },
  { id: 'thermometer', name: 'Digital Thermometer', nameAr: 'ميزان حرارة رقمي', price: '$15.99', merchantId: 'abir-pharmacy' },
  
  // Tarabay's Market
  { id: 'fresh-apples', name: 'Fresh Red Apples (1kg)', nameAr: 'تفاح أحمر طازج (1كغ)', price: '$3.99', merchantId: 'tarabay-market' },
  { id: 'whole-milk', name: 'Whole Milk (1L)', nameAr: 'حليب كامل الدسم (1ل)', price: '$2.49', merchantId: 'tarabay-market' },
  { id: 'bread-loaf', name: 'Fresh Bread Loaf', nameAr: 'رغيف خبز طازج', price: '$1.99', merchantId: 'tarabay-market' },
  
  // Coop Dmit
  { id: 'batteries-aa', name: 'AA Batteries (Pack of 4)', nameAr: 'بطاريات AA (عبوة 4)', price: '$5.99', merchantId: 'coop-dmit' },
  { id: 'tissues', name: 'Facial Tissues', nameAr: 'مناديل وجه', price: '$3.49', merchantId: 'coop-dmit' },
  { id: 'snack-chips', name: 'Potato Chips', nameAr: 'رقائق البطاطس', price: '$2.99', merchantId: 'coop-dmit' },
  
  // Afran Al Bassam
  { id: 'cheese-manakish', name: 'Cheese Manakish', nameAr: 'منقوشة جبنة', price: '$4.99', merchantId: 'afran-manakish' },
  { id: 'zaatar-manakish', name: 'Zaatar Manakish', nameAr: 'منقوشة زعتر', price: '$3.99', merchantId: 'afran-manakish' },
  { id: 'meat-manakish', name: 'Meat Manakish', nameAr: 'منقوشة لحمة', price: '$6.99', merchantId: 'afran-manakish' }
];
