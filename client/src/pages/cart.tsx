import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard, Truck } from "lucide-react";

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
    <div className="min-h-screen bg-background font-inter">
      <Header />
      
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Cart Header */}
        <div className="flex items-start mb-6 sm:mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mr-3 sm:mr-4 text-primary hover:text-primary-hover p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 hover-lift"
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
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
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-empty-cart">
              Your cart is empty
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto" data-testid="text-empty-cart-message">
              Discover amazing products from local merchants and add them to your cart
            </p>
            <Link href="/">
              <Button className="button-primary px-8 py-4 text-lg font-bold rounded-xl" data-testid="button-start-shopping">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center" data-testid="text-cart-items">
                    <ShoppingBag className="h-6 w-6 mr-3 text-primary" />
                    Cart Items
                  </h2>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="group flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all duration-300 space-y-4 sm:space-y-0" data-testid={`cart-item-${item.id}`}>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base" data-testid={`text-item-name-${item.id}`}>
                            {item.name}
                          </h3>
                          <p className="text-primary font-bold text-lg" data-testid={`text-item-price-${item.id}`}>
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
                              className="h-10 w-10 rounded-full border-2 hover:border-primary hover:text-primary transition-all duration-300"
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-12 text-center font-bold text-lg" data-testid={`text-quantity-${item.id}`}>
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10 rounded-full border-2 hover:border-primary hover:text-primary transition-all duration-300"
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-10 w-10 rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border-2 hover:border-red-300 transition-all duration-300"
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center" data-testid="text-order-summary">
                    <CreditCard className="h-6 w-6 mr-3 text-primary" />
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
                        className="w-full button-primary py-4 text-lg font-bold rounded-xl mb-3"
                        data-testid="button-checkout"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </Link>
                    <Link href="/" className="block">
                      <Button 
                        variant="outline" 
                        className="w-full py-4 text-lg font-bold rounded-xl border-2 hover:border-primary hover:text-primary transition-all duration-300"
                        data-testid="button-continue-shopping"
                      >
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
                    <div className="flex items-center justify-center space-x-2">
                      <Truck className="h-5 w-5 text-secondary" />
                      <p className="text-secondary text-sm font-bold" data-testid="text-payment-info">
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