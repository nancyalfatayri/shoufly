import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Merchant } from "@shared/schema";
import { } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface MerchantCardProps {
  merchant: Merchant;
}

export function MerchantCard({ merchant }: MerchantCardProps) {
  const { language, t } = useLanguage();
  // Mock rating and delivery time for demonstration
  const rating = 4.2 + (Number(merchant.id) % 8) * 0.1;
  const deliveryTime = 20 + (Number(merchant.id) % 5) * 5;
  
  // Get the appropriate name and description based on current language
  const merchantName = language === 'ar' && (merchant as any).nameAr 
    ? (merchant as any).nameAr 
    : merchant.name;
  const merchantDescription = language === 'ar' && (merchant as any).descriptionAr 
    ? (merchant as any).descriptionAr 
    : merchant.description;
  
  return (
    <div className="group bg-white rounded-xl xs:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover animate-fade-in border border-gray-100 flex flex-col h-full w-full">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={merchant.image}
          alt={`${merchantName} storefront`}
          className="w-full h-40 xs:h-48 sm:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
          data-testid={`img-merchant-${merchant.id}`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
      </div>
      
      {/* Content */}
      <div className="p-4 xs:p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg xs:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300" data-testid={`text-merchant-name-${merchant.id}`}>
            {merchantName}
          </h3>
        </div>
        
        <p className="text-sm xs:text-base text-gray-600 mb-3 xs:mb-4 line-clamp-2 leading-relaxed flex-1" data-testid={`text-merchant-description-${merchant.id}`}>
          {merchantDescription}
        </p>
        
        
        {/* Shop Button */}
        <div className="mt-auto">
          <Link href={`/merchant/${merchant.id}`}>
            <Button
              className={`w-full h-11 xs:h-12 rounded-xl font-bold text-sm xs:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 touch-target ${
                merchant.buttonColor === 'blue' 
                  ? 'button-primary' 
                  : 'button-secondary'
              }`}
              data-testid={`button-shop-${merchant.id}`}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{t('merchant.shopNow')}</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Bottom Accent Line */}
      <div className={`h-1 w-full transition-all duration-500 ${
        merchant.buttonColor === 'blue' 
          ? 'bg-gradient-primary' 
          : 'bg-gradient-secondary'
      } transform scale-x-0 group-hover:scale-x-100`} />
    </div>
  );
}