import { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { ArrowLeft, CheckCircle, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const confirmOrder = () => {
    setIsOrderConfirmed(true);
    // Clear cart after order confirmation
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
    }, 2000);
  };

  if (isOrderConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
        <Header />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8 sm:p-12 text-center">
            <div className="mx-auto mb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 sm:h-16 w-12 sm:w-16 text-secondary" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6" data-testid="text-order-confirmed">
              Order Confirmed!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="text-order-message">
              Thank you for your order! Your items will be delivered with cash on delivery. You'll receive updates about your delivery status.
            </p>
            <Link href="/">
              <Button className="button-primary px-10 py-4 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Checkout Header */}
        <div className="flex items-center mb-8 sm:mb-12">
          <Link href="/cart">
            <Button 
              variant="ghost" 
              className="mr-4 text-primary hover:text-primary-hover p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover-lift border border-gray-200/50"
              data-testid="button-back-to-cart"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="text-checkout-title">
              Checkout
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium" data-testid="text-checkout-subtitle">
              Review your order and confirm delivery details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Order Items */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" data-testid="text-order-items">
                    Order Items
                  </h2>
                  <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {state.items.length} items
                  </div>
                </div>
                
                <div className="space-y-6">
                  {state.items.map((item) => (
                    <div key={item.id} className="bg-gray-50/50 hover:bg-white p-6 border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300" data-testid={`checkout-item-${item.id}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg mb-2" data-testid={`text-checkout-item-name-${item.id}`}>
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-600">
                            <p className="text-base" data-testid={`text-checkout-item-quantity-${item.id}`}>
                              Qty: {item.quantity}
                            </p>
                            <p className="text-base" data-testid={`text-checkout-item-price-${item.id}`}>
                              {item.price} each
                            </p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-primary text-xl" data-testid={`text-checkout-item-total-${item.id}`}>
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden sticky top-8">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8" data-testid="text-order-summary">
                  Order Summary
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center text-gray-600 text-lg">
                    <span data-testid="text-subtotal-label">Subtotal</span>
                    <span className="font-semibold" data-testid="text-subtotal-amount">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 text-lg">
                    <span data-testid="text-delivery-fee-label">Delivery Fee</span>
                    <span className="font-semibold text-green-600" data-testid="text-delivery-fee-amount">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                      <span data-testid="text-total-label">Total</span>
                      <span className="text-primary" data-testid="text-total-amount">${state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8 p-6 bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl">
                  <div className="flex items-center">
                    <div className="bg-secondary/20 p-3 rounded-full mr-4">
                      <Truck className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary text-lg" data-testid="text-payment-method">
                        Cash on Delivery
                      </h3>
                      <p className="text-gray-600 font-medium" data-testid="text-payment-description">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirm Order Button */}
                <div className="space-y-4">
                  <Button 
                    onClick={confirmOrder}
                    className="w-full button-primary py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl"
                    data-testid="button-confirm-order"
                  >
                    Confirm Order
                  </Button>

                  <Link href="/cart" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full py-4 text-lg font-bold rounded-xl border-2 border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                      data-testid="button-back-to-cart-link"
                    >
                      Back to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}