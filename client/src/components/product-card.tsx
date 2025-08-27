import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Apple, Croissant, Milk, Cookie, Battery, StickyNote, Pill, Bandage, Thermometer, Plus, Check, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";

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
  const { dispatch: wishlistDispatch, isInWishlist } = useWishlist();
  const IconComponent = getProductIcon(product.name);
  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleLike = () => {
    if (isLiked) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover animate-fade-in border border-gray-100">
      {/* Product Image/Icon Container */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden" data-testid={`img-product-${product.id}`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${merchantButtonColor === 'blue' ? 'hsl(22 95% 58%)' : 'hsl(142 76% 36%)'} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${merchantButtonColor === 'blue' ? 'hsl(260 84% 65%)' : 'hsl(42 96% 59%)'} 0%, transparent 50%)`
          }} />
        </div>
        
        {/* Product Icon */}
        <div className="relative z-10 p-8">
          <IconComponent 
            className={`transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
              merchantButtonColor === 'blue' ? 'text-primary' : 'text-secondary'
            }`} 
            size={56} 
          />
        </div>
        
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 z-20"
          data-testid={`button-like-${product.id}`}
        >
          <Heart 
            className={`h-4 w-4 transition-colors duration-300 ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'
            }`} 
          />
        </button>
        
        {/* Quick Add Button (appears on hover) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-gray-800 hover:bg-gray-50 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-1" />
            Quick Add
          </Button>
        </div>
      </div>
      
      {/* Product Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1 mr-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <p className={`text-2xl font-bold ${
            merchantButtonColor === 'blue' ? 'text-primary' : 'text-secondary'
          }`} data-testid={`text-product-price-${product.id}`}>
            {product.price}
          </p>
          
          {/* Stock Status */}
          <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            In Stock
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full h-12 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 ${
            isAdded 
              ? 'bg-green-600 hover:bg-green-600 cursor-default' 
              : merchantButtonColor === 'blue' 
                ? 'button-primary' 
                : 'button-secondary'
          }`}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          {isAdded ? (
            <>
              <Check className="h-5 w-5 animate-bounce-in" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
              <span>Add to Cart</span>
            </>
          )}
        </Button>
      </div>
      
      {/* Bottom Accent Line */}
      <div className={`h-1 w-full transition-all duration-500 ${
        merchantButtonColor === 'blue' 
          ? 'bg-gradient-primary' 
          : 'bg-gradient-secondary'
      } transform scale-x-0 group-hover:scale-x-100`} />
    </div>
  );
}
