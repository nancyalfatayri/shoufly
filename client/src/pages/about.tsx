import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, ShoppingCart, CheckCircle, Truck, Heart, Zap, DollarSign, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* About Header */}
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
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2" data-testid="text-about-title">
              About Shoufly
            </h1>
            <p className="text-sm sm:text-base text-gray-600" data-testid="text-about-subtitle">
              Learn more about our mission and how we serve the Shouf community
            </p>
          </div>
        </div>

        {/* Introduction / Mission */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6" data-testid="text-mission-title">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" data-testid="text-mission-description">
                We bring your favorite local stores in Shouf directly to your door. Our mission is to make shopping easy, fast, and support local businesses!
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8" data-testid="text-how-it-works-title">
              How It Works
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center" data-testid="step-1">
                <div className="w-16 h-16 bg-shoufly-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-shoufly-blue" size={32} />
                </div>
                <div className="bg-shoufly-blue text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Local Merchants</h3>
                <p className="text-sm text-gray-600">
                  Discover your favorite local stores and explore their products
                </p>
              </div>

              <div className="text-center" data-testid="step-2">
                <div className="w-16 h-16 bg-shoufly-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="text-shoufly-green" size={32} />
                </div>
                <div className="bg-shoufly-green text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Add Products to Your Cart</h3>
                <p className="text-sm text-gray-600">
                  Select your favorite items and add them to your shopping cart
                </p>
              </div>

              <div className="text-center" data-testid="step-3">
                <div className="w-16 h-16 bg-shoufly-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-shoufly-blue" size={32} />
                </div>
                <div className="bg-shoufly-blue text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Confirm Your Order</h3>
                <p className="text-sm text-gray-600">
                  Review your cart and confirm your order with our simple checkout
                </p>
              </div>

              <div className="text-center" data-testid="step-4">
                <div className="w-16 h-16 bg-shoufly-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="text-shoufly-green" size={32} />
                </div>
                <div className="bg-shoufly-green text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get It Delivered</h3>
                <p className="text-sm text-gray-600">
                  Receive your order straight to your door with cash on delivery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us / Our Values */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8" data-testid="text-values-title">
              Why Choose Shoufly?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start" data-testid="value-1">
                <div className="w-12 h-12 bg-shoufly-green/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Heart className="text-shoufly-green" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support Local Businesses</h3>
                  <p className="text-gray-600">
                    Every order helps strengthen our local Shouf community and supports neighborhood merchants
                  </p>
                </div>
              </div>

              <div className="flex items-start" data-testid="value-2">
                <div className="w-12 h-12 bg-shoufly-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Zap className="text-shoufly-blue" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy, Fast Delivery</h3>
                  <p className="text-gray-600">
                    Quick and convenient delivery service that brings your favorite products to your doorstep
                  </p>
                </div>
              </div>

              <div className="flex items-start" data-testid="value-3">
                <div className="w-12 h-12 bg-shoufly-green/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <DollarSign className="text-shoufly-green" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">
                    No hidden fees or surprises. What you see is what you pay, with cash on delivery available
                  </p>
                </div>
              </div>

              <div className="flex items-start" data-testid="value-4">
                <div className="w-12 h-12 bg-shoufly-blue/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="text-shoufly-blue" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Friendly and Reliable Service</h3>
                  <p className="text-gray-600">
                    Our dedicated team ensures a smooth experience from browsing to delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-8">
          <div className="bg-gradient-to-r from-shoufly-blue to-shoufly-green p-6 sm:p-8 rounded-xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Start Shopping?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto" data-testid="text-cta-description">
              Discover amazing local products from Shouf's best merchants and get them delivered fast!
            </p>
            <Link href="/">
              <Button 
                className="bg-white text-shoufly-blue hover:bg-gray-100 font-semibold py-3 px-8 text-base min-h-[44px]"
                data-testid="button-start-shopping"
              >
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}