import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard, Truck, Lock } from "lucide-react";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { isAuthenticated } = useAuth();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 xs:py-6 sm:py-10">
        {/* Cart Header */}
        <div className="flex items-center mb-6 xs:mb-8 sm:mb-12">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mr-2 xs:mr-4 text-primary hover:text-primary-hover p-2 xs:p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover-lift border border-gray-200/50 touch-target"
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-bold text-gray-900 mb-1 xs:mb-2" data-testid="text-cart-title">
              Shopping Cart
            </h1>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600 font-medium" data-testid="text-cart-subtitle">
              {state.items.length} {state.items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-12 xs:py-16 sm:py-20">
            <div className="w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 xs:mb-8 shadow-lg">
              <ShoppingBag className="h-12 xs:h-16 sm:h-20 w-12 xs:w-16 sm:w-20 text-gray-400" />
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-4 xs:mb-6" data-testid="text-empty-cart">
              Your cart is empty
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 mb-6 xs:mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed px-4" data-testid="text-empty-cart-message">
              Discover amazing products from local merchants and add them to your cart to get started
            </p>
            <Link href="/">
              <Button className="button-primary px-6 xs:px-8 sm:px-10 py-3 xs:py-4 text-base xs:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl touch-target" data-testid="button-start-shopping">
                <ShoppingBag className="h-5 xs:h-6 w-5 xs:w-6 mr-2 xs:mr-3" />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="p-4 xs:p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center" data-testid="text-cart-items">
                      <ShoppingBag className="h-7 w-7 mr-3 text-primary" />
                      Cart Items
                    </h2>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                      {state.items.length} items
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="group bg-gray-50/50 hover:bg-white p-6 border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`cart-item-${item.id}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg mb-2" data-testid={`text-item-name-${item.id}`}>
                              {item.name}
                            </h3>
                            <p className="text-primary font-bold text-xl" data-testid={`text-item-price-${item.id}`}>
                              {item.price} each
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <div className="flex items-center space-x-3 bg-white rounded-full p-1 border border-gray-200">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-9 w-9 rounded-full hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus size={16} />
                              </Button>
                              <span className="w-12 text-center font-bold text-lg text-gray-900" data-testid={`text-quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-9 w-9 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus size={16} />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="h-10 w-10 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                              data-testid={`button-remove-${item.id}`}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 px-6 py-3 rounded-xl font-medium"
                      data-testid="button-clear-cart"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden sticky top-8">
                <div className="p-4 xs:p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center" data-testid="text-order-summary">
                    <CreditCard className="h-7 w-7 mr-3 text-primary" />
                    Order Summary
                  </h2>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center text-gray-600 text-lg">
                      <span data-testid="text-subtotal-label">Subtotal</span>
                      <span className="font-semibold" data-testid="text-subtotal-amount">${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 text-lg">
                      <span data-testid="text-delivery-label">Delivery</span>
                      <span className="font-semibold text-green-600" data-testid="text-delivery-amount">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                        <span data-testid="text-total-label">Total</span>
                        <span className="text-primary" data-testid="text-total-amount">${state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {isAuthenticated ? (
                      <Link href="/checkout" className="block">
                        <Button 
                          className="w-full button-primary py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl"
                          data-testid="button-checkout"
                        >
                          <CreditCard className="h-6 w-6 mr-3" />
                          Proceed to Checkout
                        </Button>
                      </Link>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center space-x-3">
                          <Lock className="h-5 w-5 text-amber-600 flex-shrink-0" />
                          <p className="text-amber-800 text-sm font-medium">
                            Sign in to proceed with checkout
                          </p>
                        </div>
                        <Link href="/login" className="block">
                          <Button 
                            className="w-full button-primary py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl"
                            data-testid="button-signin-checkout"
                          >
                            <Lock className="h-6 w-6 mr-3" />
                            Sign In to Checkout
                          </Button>
                        </Link>
                      </div>
                    )}
                    <Link href="/" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full py-4 text-lg font-bold rounded-xl border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                        data-testid="button-continue-shopping"
                      >
                        <ShoppingBag className="h-6 w-6 mr-3" />
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-8 p-5 bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl">
                    <div className="flex items-center justify-center space-x-3">
                      <Truck className="h-6 w-6 text-secondary" />
                      <p className="text-secondary text-base font-bold text-center" data-testid="text-payment-info">
                        Free Delivery • Cash on Delivery Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}