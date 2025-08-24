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
      <div className="min-h-screen bg-gray-50 font-inter">
        <Header />
        
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mx-auto mb-6">
              <CheckCircle className="mx-auto h-16 w-16 text-shoufly-green" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-order-confirmed">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8" data-testid="text-order-message">
              Thank you for your order. Your items will be delivered with cash on delivery.
            </p>
            <Link href="/">
              <Button className="bg-shoufly-blue hover:bg-blue-600 text-white" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Checkout Header */}
        <div className="flex items-center mb-8">
          <Link href="/cart">
            <Button 
              variant="ghost" 
              className="mr-4 text-shoufly-blue hover:text-blue-600 p-2"
              data-testid="button-back-to-cart"
            >
              <ArrowLeft className="text-xl" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900" data-testid="text-checkout-title">
              Checkout
            </h1>
            <p className="text-gray-600" data-testid="text-checkout-subtitle">
              Review your order and confirm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-order-items">
                Order Items
              </h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0" data-testid={`checkout-item-${item.id}`}>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900" data-testid={`text-checkout-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600" data-testid={`text-checkout-item-quantity-${item.id}`}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-shoufly-blue" data-testid={`text-checkout-item-total-${item.id}`}>
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500" data-testid={`text-checkout-item-price-${item.id}`}>
                        {item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Checkout */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-order-summary">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span data-testid="text-subtotal-label">Subtotal</span>
                  <span data-testid="text-subtotal-amount">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span data-testid="text-delivery-fee-label">Delivery Fee</span>
                  <span data-testid="text-delivery-fee-amount">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span data-testid="text-total-label">Total</span>
                    <span data-testid="text-total-amount">${state.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 p-4 bg-shoufly-green/10 border border-shoufly-green/20 rounded-lg">
                <div className="flex items-center">
                  <Truck className="text-shoufly-green mr-3" />
                  <div>
                    <h3 className="font-medium text-shoufly-green" data-testid="text-payment-method">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-600" data-testid="text-payment-description">
                      Pay when your order arrives
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm Order Button */}
              <Button 
                onClick={confirmOrder}
                className="w-full bg-shoufly-blue hover:bg-blue-600 text-white py-3 text-lg font-semibold"
                data-testid="button-confirm-order"
              >
                Confirm Order
              </Button>

              <div className="mt-4 text-center">
                <Link href="/cart">
                  <Button 
                    variant="ghost" 
                    className="text-shoufly-blue hover:text-blue-600"
                    data-testid="button-back-to-cart-link"
                  >
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}