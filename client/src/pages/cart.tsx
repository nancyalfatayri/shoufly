import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { state, dispatch } = useCart();

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
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Cart Header */}
        <div className="flex items-start mb-6 sm:mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mr-3 sm:mr-4 text-shoufly-blue hover:text-blue-600 p-2 min-h-[44px] min-w-[44px]"
              data-testid="button-back"
            >
              <ArrowLeft className="text-lg sm:text-xl" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2" data-testid="text-cart-title">
              Shopping Cart
            </h1>
            <p className="text-sm sm:text-base text-gray-600" data-testid="text-cart-subtitle">
              {state.items.length} {state.items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4" data-testid="text-empty-cart">
              Your cart is empty
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4" data-testid="text-empty-cart-message">
              Start shopping to add items to your cart
            </p>
            <Link href="/">
              <Button className="bg-shoufly-blue hover:bg-blue-600 text-white py-3 px-6 text-base font-medium min-h-[44px]" data-testid="button-start-shopping">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-cart-items">
                    Cart Items
                  </h2>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0" data-testid={`cart-item-${item.id}`}>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base" data-testid={`text-item-name-${item.id}`}>
                            {item.name}
                          </h3>
                          <p className="text-shoufly-blue font-semibold text-sm sm:text-base" data-testid={`text-item-price-${item.id}`}>
                            {item.price} each
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end space-x-3">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="min-h-[44px] min-w-[44px] p-0"
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-8 text-center font-medium text-base" data-testid={`text-quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="min-h-[44px] min-w-[44px] p-0"
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 min-h-[44px] min-w-[44px] p-0"
                            data-testid={`button-remove-${item.id}`}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      data-testid="button-clear-cart"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-order-summary">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span data-testid="text-subtotal-label">Subtotal</span>
                      <span data-testid="text-subtotal-amount">${state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span data-testid="text-delivery-label">Delivery</span>
                      <span data-testid="text-delivery-amount">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span data-testid="text-total-label">Total</span>
                        <span data-testid="text-total-amount">${state.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Link href="/checkout" className="block">
                      <Button 
                        className="w-full bg-shoufly-blue hover:bg-blue-600 text-white py-3 text-base font-medium min-h-[44px]"
                        data-testid="button-checkout"
                      >
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full py-3 text-base font-medium min-h-[44px]"
                        data-testid="button-continue-shopping"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 p-4 bg-shoufly-green/10 border border-shoufly-green/20 rounded-lg">
                    <p className="text-shoufly-green text-sm font-medium text-center" data-testid="text-payment-info">
                      💰 Cash on Delivery Available
                    </p>
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