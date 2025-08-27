import { useRoute, Link } from "wouter";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { merchants, products } from "@/lib/data";
import { ArrowLeft, Truck } from "lucide-react";

export default function MerchantPage() {
  const [, params] = useRoute("/merchant/:id");
  const merchantId = params?.id;
  
  const merchant = merchants.find(m => m.id === merchantId);
  const merchantProducts = products.filter(p => p.merchantId === merchantId);

  if (!merchant) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Merchant not found</h1>
            <Link href="/">
              <Button className="bg-shoufly-blue text-white">Back to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-8">
        {/* Merchant Header */}
        <div className="flex items-start mb-4 xs:mb-6 sm:mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mr-2 xs:mr-3 sm:mr-4 text-shoufly-blue hover:text-blue-600 p-2 touch-target"
              data-testid="button-back"
            >
              <ArrowLeft className="text-lg sm:text-xl" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg xs:text-xl sm:text-3xl font-bold text-gray-900 mb-1 xs:mb-2" data-testid={`text-merchant-title-${merchant.id}`}>
              {merchant.name}
            </h1>
            <p className="text-xs xs:text-sm sm:text-base text-gray-600" data-testid={`text-merchant-subtitle-${merchant.id}`}>
              {merchant.description}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-shoufly-green/10 border border-shoufly-green/20 rounded-lg p-3 xs:p-4 mb-4 xs:mb-6 sm:mb-8" data-testid="payment-info">
          <div className="flex items-center">
            <Truck className="text-shoufly-green mr-2 xs:mr-3 flex-shrink-0" size={16} />
            <span className="text-shoufly-green font-medium text-xs xs:text-sm sm:text-base">Cash on Delivery Available</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6" data-testid={`grid-products-${merchant.id}`}>
          {merchantProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              merchantButtonColor={merchant.buttonColor}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p data-testid="text-footer-copyright">&copy; 2024 Shoufly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
