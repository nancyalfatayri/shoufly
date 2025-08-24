import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Merchant } from "@shared/schema";

interface MerchantCardProps {
  merchant: Merchant;
}

export function MerchantCard({ merchant }: MerchantCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src={merchant.image}
        alt={`${merchant.name} storefront`}
        className="w-full h-48 object-cover"
        data-testid={`img-merchant-${merchant.id}`}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid={`text-merchant-name-${merchant.id}`}>
          {merchant.name}
        </h3>
        <p className="text-gray-600 mb-4" data-testid={`text-merchant-description-${merchant.id}`}>
          {merchant.description}
        </p>
        <Link href={`/merchant/${merchant.id}`}>
          <Button
            className={`w-full ${
              merchant.buttonColor === 'blue' 
                ? 'bg-shoufly-blue hover:bg-blue-600' 
                : 'bg-shoufly-green hover:bg-green-600'
            } text-white py-2 px-4 rounded-lg transition-colors`}
            data-testid={`button-shop-${merchant.id}`}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
