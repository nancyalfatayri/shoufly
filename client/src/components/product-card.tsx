import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Apple, Croissant, Milk, Cookie, Battery, StickyNote, Pill, Bandage, Thermometer } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
  product: Product;
  merchantButtonColor: 'blue' | 'green';
}

const getProductIcon = (productName: string) => {
  const name = productName.toLowerCase();
  if (name.includes('apple')) return Apple;
  if (name.includes('bread')) return Croissant;
  if (name.includes('milk')) return Milk;
  if (name.includes('snack')) return Cookie;
  if (name.includes('batteries')) return Battery;
  if (name.includes('tissue')) return StickyNote;
  if (name.includes('vitamin') || name.includes('tablets')) return Pill;
  if (name.includes('first aid')) return Bandage;
  if (name.includes('thermometer')) return Thermometer;
  return Cookie; // default icon
};

export function ProductCard({ product, merchantButtonColor }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { dispatch } = useCart();
  const IconComponent = getProductIcon(product.name);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-36 sm:h-48 bg-gray-200 flex items-center justify-center" data-testid={`img-product-${product.id}`}>
        <IconComponent className="text-gray-400" size={48} />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className={`text-xl sm:text-2xl font-bold mb-4 ${
          merchantButtonColor === 'blue' ? 'text-shoufly-blue' : 'text-shoufly-green'
        }`} data-testid={`text-product-price-${product.id}`}>
          {product.price}
        </p>
        <Button
          onClick={handleAddToCart}
          className={`w-full ${
            isAdded 
              ? 'bg-green-600' 
              : merchantButtonColor === 'blue' 
                ? 'bg-shoufly-blue hover:bg-blue-600' 
                : 'bg-shoufly-green hover:bg-green-600'
          } text-white py-3 px-4 rounded-lg transition-colors text-sm sm:text-base font-medium min-h-[44px]`}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {isAdded ? 'Added!' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
