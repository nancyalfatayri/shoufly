import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, ShoppingCart, Trash2, Lock } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

export default function WishlistPage() {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Lock className="h-10 w-10 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sign In Required
              </h2>
              <p className="text-gray-600 mb-8">
                Please sign in to your account to view and manage your wishlist items.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button className="button-primary px-8 py-3 text-lg font-semibold rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" className="px-8 py-3 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const removeFromWishlist = (productId: string) => {
    wishlistDispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const addToCart = (product: any) => {
    cartDispatch({ type: 'ADD_ITEM', payload: product });
  };

  const clearWishlist = () => {
    wishlistDispatch({ type: 'CLEAR_WISHLIST' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Wishlist Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center">
            <Link href="/">
              <Button 
                variant="ghost" 
                className="mr-4 text-primary hover:text-primary-hover p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover-lift border border-gray-200/50"
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="text-wishlist-title">
                My Wishlist
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-medium">
                {wishlistState.items.length} {wishlistState.items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
          
          {wishlistState.items.length > 0 && (
            <Button
              onClick={clearWishlist}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              data-testid="button-clear-wishlist"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist Content */}
        {wishlistState.items.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-empty-wishlist">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding products you love by clicking the heart icon on any product
              </p>
              <Link href="/">
                <Button className="button-primary px-8 py-3 text-lg font-semibold rounded-xl">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistState.items.map((product) => (
              <div 
                key={product.id} 
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                data-testid={`card-wishlist-${product.id}`}
              >
                {/* Product Header */}
                <div className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100 h-32 flex items-center justify-center">
                  <div className="text-4xl font-bold text-primary">
                    {product.name.charAt(0)}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 text-red-500 hover:text-red-600"
                    data-testid={`button-remove-${product.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2" data-testid={`text-product-name-${product.id}`}>
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                      {product.price}
                    </p>
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full button-primary py-3 text-base font-semibold rounded-xl"
                      data-testid={`button-add-to-cart-${product.id}`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}