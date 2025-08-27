import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.merchants': 'Merchants',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.home': 'Home',
    'nav.cart': 'Cart',
    'nav.wishlist': 'Wishlist',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.signout': 'Sign Out',
    'nav.myaccount': 'My Account',
    'nav.myorders': 'My Orders',
    'nav.admin': 'Admin Dashboard',

    // Hero Section
    'hero.title.part1': 'Shop Local,',
    'hero.title.part2': 'Delivered Fast',
    'hero.description': 'Order from your favorite local stores and get fresh groceries, pharmacy items, and baked goods delivered straight to your door.',
    'hero.cta': 'Start Shopping',

    // Search
    'search.placeholder': 'Search merchants and stores...',
    'search.results': 'Search Results',
    'search.found': 'merchants found',
    'search.merchant': 'merchant',
    'search.noResults': 'No merchants found',
    'search.noResultsDesc': 'We couldn\'t find any merchants matching your search. Try a different search term or browse all available merchants.',
    'search.browseAll': 'Browse All Merchants',

    // Merchants Section
    'merchants.featured': 'Featured Merchants',
    'merchants.description': 'Discover amazing local businesses in your neighborhood. From fresh groceries to specialty items.',
    'merchants.showing': 'Showing',
    'merchants.matching': 'merchants matching your search',
    'merchants.tryAdjusting': 'Try adjusting your search terms or browse all merchants below',

    // Features
    'features.title': 'Why Choose Shoufly?',
    'features.subtitle': 'We\'re committed to connecting you with the best local businesses while providing exceptional service.',
    'features.transparent.title': 'Transparent Pricing',
    'features.transparent.desc': 'No hidden fees or surprises. What you see is what you pay, with clear pricing on every item.',
    'features.support.title': 'Support Local',
    'features.support.desc': 'Every order helps support local businesses and strengthens your community.',

    // Footer
    'footer.quicklinks': 'Quick Links',
    'footer.aboutus': 'About Us',
    'footer.careers': 'Careers',
    'footer.copyright': '© 2024 Shoufly. All rights reserved. Made with ❤️ for local communities.',
    'footer.description': 'Connecting you with the best local businesses. Fresh groceries, pharmacy items, and more delivered to your door.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.tryAgain': 'Try Again',
  },
  ar: {
    // Navigation
    'nav.merchants': 'التجار',
    'nav.about': 'معلومات عنا',
    'nav.contact': 'اتصل بنا',
    'nav.home': 'الرئيسية',
    'nav.cart': 'السلة',
    'nav.wishlist': 'المفضلة',
    'nav.signin': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.signout': 'تسجيل الخروج',
    'nav.myaccount': 'حسابي',
    'nav.myorders': 'طلباتي',
    'nav.admin': 'لوحة الإدارة',

    // Hero Section
    'hero.title.part1': 'تسوق محلياً،',
    'hero.title.part2': 'توصيل سريع',
    'hero.description': 'اطلب من متاجرك المحلية المفضلة واحصل على البقالة الطازجة ومنتجات الصيدلية والمخبوزات مع التوصيل إلى باب منزلك.',
    'hero.cta': 'ابدأ التسوق',

    // Search
    'search.placeholder': 'ابحث عن التجار والمتاجر...',
    'search.results': 'نتائج البحث',
    'search.found': 'تاجر موجود',
    'search.merchant': 'تاجر',
    'search.noResults': 'لا توجد تجار',
    'search.noResultsDesc': 'لم نجد أي تجار يطابقون بحثك. جرب مصطلح بحث مختلف أو تصفح جميع التجار المتاحين.',
    'search.browseAll': 'تصفح جميع التجار',

    // Merchants Section
    'merchants.featured': 'التجار المميزون',
    'merchants.description': 'اكتشف الشركات المحلية الرائعة في حيك. من البقالة الطازجة إلى السلع المتخصصة.',
    'merchants.showing': 'عرض',
    'merchants.matching': 'تاجر يطابق بحثك',
    'merchants.tryAdjusting': 'جرب تعديل مصطلحات البحث أو تصفح جميع التجار أدناه',

    // Features
    'features.title': 'لماذا تختار شوفلي؟',
    'features.subtitle': 'نحن ملتزمون بربطك بأفضل الشركات المحلية مع توفير خدمة استثنائية.',
    'features.transparent.title': 'أسعار شفافة',
    'features.transparent.desc': 'لا توجد رسوم مخفية أو مفاجآت. ما تراه هو ما تدفعه، مع أسعار واضحة لكل عنصر.',
    'features.support.title': 'دعم المحليين',
    'features.support.desc': 'كل طلب يساعد في دعم الشركات المحلية ويقوي مجتمعك.',

    // Footer
    'footer.quicklinks': 'روابط سريعة',
    'footer.aboutus': 'معلومات عنا',
    'footer.careers': 'الوظائف',
    'footer.copyright': '© 2024 شوفلي. جميع الحقوق محفوظة. صُنع بـ ❤️ للمجتمعات المحلية.',
    'footer.description': 'نربطك بأفضل الشركات المحلية. البقالة الطازجة ومنتجات الصيدلية وأكثر مع التوصيل إلى بابك.',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.tryAgain': 'حاول مرة أخرى',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language preference and update document direction
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}