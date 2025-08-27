import { Header } from "@/components/header";
import { MerchantCard } from "@/components/merchant-card";
import { Button } from "@/components/ui/button";
import { merchants } from "@/lib/data";
import { Search, MapPin, Clock, Star, Truck, Shield, Heart, X } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import shouflylLogo from "@assets/generated_images/Shoufly_modern_delivery_logo_5ce80390.png";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter merchants based on search query
  const filteredMerchants = useMemo(() => {
    if (!searchQuery.trim()) return merchants;
    
    return merchants.filter(merchant => 
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to merchants section when search is submitted
    document.getElementById('merchants')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 0%, transparent 50%), radial-gradient(circle at 75% 75%, white 0%, transparent 50%)`
            }} />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              {/* Hero Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-fade-in">
                <Star className="h-4 w-4 mr-2 fill-yellow-300 text-yellow-300" />
                Trusted by 10,000+ happy customers
              </div>
              
              {/* Hero Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up" data-testid="text-hero-title">
                Shop Local,{" "}
                <span className="block sm:inline bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 mt-2 sm:mt-0 sm:ml-2">Delivered Fast</span>
              </h1>
              
              {/* Hero Description */}
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up" data-testid="text-hero-description">
                Order from your favorite local stores and get fresh groceries, pharmacy items, and baked goods delivered straight to your door in under 30 minutes.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
                <Link href="/#merchants">
                  <Button className="w-full sm:w-auto bg-white text-primary hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <Search className="h-5 w-5 mr-2" />
                    Start Shopping
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-4 rounded-xl backdrop-blur-sm">
                  <MapPin className="h-5 w-5 mr-2" />
                  Find Stores Near Me
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 max-w-md mx-auto text-white/80">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">30min Delivery</p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Free Delivery</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{
            clipPath: 'ellipse(100% 100% at 50% 100%)'
          }} />
        </section>

        {/* Search Bar Section */}
        <section className="relative -mt-10 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for stores, products, or categories..."
                    className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 outline-none transition-all duration-300 ${
                      isSearchFocused 
                        ? 'border-primary ring-4 ring-primary/10 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    data-testid="input-search"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 z-10"
                      data-testid="button-clear-search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <Button 
                  type="submit"
                  className="button-primary px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-xl"
                  data-testid="button-search"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </form>
              
              {/* Search Results Count */}
              {searchQuery && (
                <div className="mt-4 px-2">
                  <p className="text-sm text-gray-600">
                    {filteredMerchants.length > 0 
                      ? `Found ${filteredMerchants.length} ${filteredMerchants.length === 1 ? 'result' : 'results'} for "${searchQuery}"`
                      : `No results found for "${searchQuery}"`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>


        {/* Merchants Section */}
        <section id="merchants" className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="text-featured-merchants">
                {searchQuery ? (
                  <>Search <span className="text-gradient">Results</span></>
                ) : (
                  <>Featured <span className="text-gradient">Merchants</span></>
                )}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {searchQuery ? (
                  filteredMerchants.length > 0 
                    ? `Showing ${filteredMerchants.length} ${filteredMerchants.length === 1 ? 'merchant' : 'merchants'} matching your search`
                    : "Try adjusting your search terms or browse all merchants below"
                ) : (
                  "Discover amazing local businesses in your neighborhood. From fresh groceries to specialty items."
                )}
              </p>
            </div>
            
            {filteredMerchants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" data-testid="grid-merchants">
                {filteredMerchants.map((merchant, index) => (
                  <div key={merchant.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <MerchantCard merchant={merchant} />
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No merchants found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any merchants matching "{searchQuery}". Try a different search term or browse all available merchants.
                </p>
                <Button 
                  onClick={clearSearch}
                  variant="outline"
                  className="button-secondary text-white border-0"
                >
                  Browse All Merchants
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" data-testid="grid-merchants">
                {merchants.map((merchant, index) => (
                  <div key={merchant.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <MerchantCard merchant={merchant} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-gradient">Shoufly</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to connecting you with the best local businesses while providing exceptional service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Get your orders delivered in under 30 minutes with our efficient delivery network.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Support Local</h3>
                <p className="text-gray-600">Every order helps support local businesses and strengthens your community.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Safe</h3>
                <p className="text-gray-600">Your payments and personal data are protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src={shouflylLogo}
                  alt="Shoufly logo"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting you with the best local businesses. Fresh groceries, pharmacy items, and more delivered to your door.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Become a Partner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p data-testid="text-footer-copyright">&copy; 2024 Shoufly. All rights reserved. Made with ❤️ for local communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
