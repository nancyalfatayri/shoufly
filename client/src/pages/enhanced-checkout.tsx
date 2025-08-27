import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { ArrowLeft, CheckCircle, MapPin, Phone, StickyNote, CreditCard } from "lucide-react";

export default function EnhancedCheckoutPage() {
  const { state: cartState, dispatch } = useCart();
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    phone: '',
    notes: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartState.items.length === 0 && !isOrderConfirmed) {
      setLocation('/cart');
    }
  }, [cartState.items.length, isOrderConfirmed, setLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateTotal = () => {
    return cartState.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const orderItems = cartState.items.map(item => ({
        productId: item.id,
        productName: item.name,
        price: item.price,
        quantity: item.quantity,
        merchantId: item.merchantId
      }));

      const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          ...formData,
          items: orderItems
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }

      setOrderId(result.order.id);
      setIsOrderConfirmed(true);
      dispatch({ type: 'CLEAR_CART' });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect
  }

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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Order Confirmed!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
              Thank you for your order! Your order #{orderId} has been placed successfully.
            </p>
            <p className="text-base text-gray-500 mb-8 sm:mb-12">
              You'll receive WhatsApp notifications about your delivery status. Expected delivery time: 30-45 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation('/my-orders')}
                variant="outline" 
                className="px-8 py-3 text-base font-medium rounded-xl"
              >
                View My Orders
              </Button>
              <Button 
                onClick={() => setLocation('/')}
                className="button-primary px-10 py-3 text-base font-bold rounded-xl shadow-xl hover:shadow-2xl"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (cartState.items.length === 0) {
    return null; // Will redirect
  }

  const total = calculateTotal();

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
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
              Checkout
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Review your order and confirm delivery details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Order Summary */}
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartState.items.map((item) => (
                    <div key={`${item.id}-${item.merchantId}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">{item.price}</p>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Cash on Delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Details Form */}
          <div className="lg:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-6 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-600">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress" className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>Delivery Address *</span>
                    </Label>
                    <Textarea
                      id="deliveryAddress"
                      name="deliveryAddress"
                      placeholder="Enter your complete delivery address"
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number *</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      We'll send order updates via WhatsApp to this number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="flex items-center space-x-2">
                      <StickyNote className="h-4 w-4" />
                      <span>Special Instructions (Optional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any special delivery instructions or notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold rounded-xl shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Placing Order...</span>
                      </div>
                    ) : (
                      `Place Order - $${total.toFixed(2)}`
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    By placing this order, you agree to pay cash on delivery.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}