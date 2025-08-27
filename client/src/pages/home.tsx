import { Header } from "@/components/header";
import { MerchantCard } from "@/components/merchant-card";
import { Button } from "@/components/ui/button";
import { merchants } from "@/lib/data";
import { Search, MapPin, Clock, Star, Truck, Shield, Heart, X } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import shouflylLogo from "@assets/generated_images/Clean_Shoufly_text_logo_cd109857.png";

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
        <section className="relative overflow-hidden" style={{
          background: 'linear-gradient(135deg, hsl(22 95% 58%) 0%, hsl(260 84% 65%) 100%)'
        }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }} />
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-24 lg:py-32">
            <div className="text-center">
              {/* Hero Title */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 xs:mb-6 animate-slide-up" data-testid="text-hero-title">
                Shop Local,{" "}
                <span className="block xs:inline bg-white/20 backdrop-blur-sm rounded-xl xs:rounded-2xl px-3 xs:px-4 py-1.5 xs:py-2 mt-2 xs:mt-0 xs:ml-2">Delivered Fast</span>
              </h1>
              
              {/* Hero Description */}
              <p className="text-base xs:text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-6 xs:mb-8 leading-relaxed animate-slide-up px-4" data-testid="text-hero-description">
                Order from your favorite local stores and get fresh groceries, pharmacy items, and baked goods delivered straight to your door.
              </p>
              
              {/* CTA Button */}
              <div className="flex justify-center animate-fade-in">
                <Button 
                  onClick={() => {
                    const merchantsSection = document.getElementById('merchants');
                    merchantsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-primary hover:bg-gray-50 font-bold text-base xs:text-lg px-6 xs:px-8 py-4 xs:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 touch-target whitespace-nowrap flex items-center gap-2 min-w-fit min-h-[3.5rem] leading-relaxed"
                  data-testid="button-start-shopping"
                >
                  <Search className="h-5 w-5 flex-shrink-0" />
                  <span className="leading-normal">Start Shopping</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-background" style={{
            clipPath: 'ellipse(100% 100% at 50% 100%)'
          }} />
        </section>

        {/* Search Bar Section */}
        <section className="relative -mt-6 xs:-mt-8 z-10">
          <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-4 xs:p-6 sm:p-8">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    {/* Search Input Container */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 xs:pl-6 pointer-events-none">
                        <Search className={`h-5 xs:h-6 w-5 xs:w-6 transition-colors duration-300 ${
                          isSearchFocused ? 'text-primary' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Search merchants and stores..."
                        className={`w-full pl-12 xs:pl-16 pr-24 xs:pr-32 py-4 xs:py-6 text-base xs:text-lg bg-gray-50 border-0 rounded-xl xs:rounded-2xl outline-none transition-all duration-300 placeholder:text-gray-400 ${
                          isSearchFocused 
                            ? 'bg-white shadow-xl ring-4 ring-primary/10 scale-[1.02]' 
                            : 'hover:bg-white hover:shadow-lg'
                        }`}
                        data-testid="input-search"
                      />
                      
                      {/* Action Buttons Container */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 xs:pr-3 space-x-1 xs:space-x-2">
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={clearSearch}
                            className="p-1.5 xs:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 touch-target"
                            data-testid="button-clear-search"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                        <Button 
                          type="submit"
                          className="button-primary px-4 xs:px-6 py-2 xs:py-3 text-sm xs:text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 touch-target"
                          data-testid="button-search"
                        >
                          <Search className="h-4 xs:h-5 w-4 xs:w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* Search Results Count */}
                {searchQuery && (
                  <div className="mt-6 px-2">
                    <div className="flex items-center justify-center">
                      <div className="bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                        <p className="text-sm font-medium text-primary">
                          {filteredMerchants.length > 0 
                            ? `${filteredMerchants.length} ${filteredMerchants.length === 1 ? 'merchant' : 'merchants'} found`
                            : `No merchants found for "${searchQuery}"`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Merchants Section */}
        <section id="merchants" className="pt-16 pb-16">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12">
              <h2 className="text-2xl xs:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 xs:mb-4" data-testid="text-featured-merchants">
                {searchQuery ? (
                  <>Search <span className="text-gradient">Results</span></>
                ) : (
                  <>Featured <span className="text-gradient">Merchants</span></>
                )}
              </h2>
              <p className="text-base xs:text-lg text-gray-600 max-w-2xl mx-auto px-4">
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
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-6 lg:gap-8 items-stretch" data-testid="grid-merchants">
                {filteredMerchants.map((merchant, index) => (
                  <div key={merchant.id} className="animate-fade-in flex" style={{ animationDelay: `${index * 100}ms` }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch" data-testid="grid-merchants">
                {merchants.map((merchant, index) => (
                  <div key={merchant.id} className="animate-fade-in flex" style={{ animationDelay: `${index * 100}ms` }}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
                <p className="text-gray-600">No hidden fees or surprises. What you see is what you pay, with clear pricing on every item.</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Support Local</h3>
                <p className="text-gray-600">Every order helps support local businesses and strengthens your community.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src={shouflylLogo}
                  alt="Shoufly logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Connecting you with the best local businesses. Fresh groceries, pharmacy items, and more delivered to your door.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
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
