import { Link } from "wouter";
import { ShoppingCart, Menu, X, Home, Info, Mail } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useState } from "react";
import shouflylLogo from "@assets/generated_images/Shoufly_delivery_app_logo_47ff6a01.png";

export function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center cursor-pointer hover-lift" 
              data-testid="link-home"
              onClick={closeMobileMenu}
            >
              <img
                src={shouflylLogo}
                alt="Shoufly logo"
                className="h-12 sm:h-14 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/#merchants" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-merchants"
              >
                Merchants
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-about"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-contact"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Cart and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative text-gray-700 hover:text-primary transition-all duration-300 p-3 -m-3 hover:bg-gray-50 rounded-full hover-lift" 
                data-testid="link-cart"
                onClick={closeMobileMenu}
              >
                <ShoppingCart size={22} className="transition-transform duration-300 hover:scale-110" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce-in" data-testid="cart-count">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-700 hover:text-primary transition-all duration-300 p-2 -m-2 hover:bg-gray-50 rounded-lg"
                data-testid="button-mobile-menu"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu size={24} className="transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <img
              src={shouflylLogo}
              alt="Shoufly logo"
              className="h-10 w-auto"
            />
            <button
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 -m-2"
              data-testid="button-close-mobile-menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-4">
            <Link 
              href="/" 
              className="flex items-center space-x-3 text-gray-700 hover:text-primary font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group" 
              data-testid="link-mobile-home"
              onClick={closeMobileMenu}
            >
              <Home size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span>Home</span>
            </Link>
            <Link 
              href="/#merchants" 
              className="flex items-center space-x-3 text-gray-700 hover:text-primary font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group" 
              data-testid="link-mobile-merchants"
              onClick={closeMobileMenu}
            >
              <ShoppingCart size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span>Merchants</span>
            </Link>
            <Link 
              href="/about" 
              className="flex items-center space-x-3 text-gray-700 hover:text-primary font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group" 
              data-testid="link-mobile-about"
              onClick={closeMobileMenu}
            >
              <Info size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span>About</span>
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center space-x-3 text-gray-700 hover:text-primary font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group" 
              data-testid="link-mobile-contact"
              onClick={closeMobileMenu}
            >
              <Mail size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
              <span>Contact</span>
            </Link>
          </nav>

          {/* Mobile Cart Summary */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <Link 
              href="/cart" 
              className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors"
              data-testid="link-mobile-cart"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart size={20} />
                <span className="font-medium">My Cart</span>
              </div>
              {itemCount > 0 && (
                <span className="bg-gradient-primary text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
