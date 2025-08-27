import { Link } from "wouter";
import { ShoppingCart, Menu, X, Home, Info, Mail, Heart, User, LogOut, Settings, Package, Globe } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import shouflylLogo from "@assets/generated_images/Clean_Shoufly_text_logo_cd109857.png";

export function Header() {
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const { isAuthenticated, isAdmin, state: authState, logout } = useAuth();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistState.items.length;
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
                className="h-12 sm:h-16 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              <Link 
                href="/#merchants" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-merchants"
              >
                {t('nav.merchants')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-about"
              >
                {t('nav.about')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary font-medium transition-all duration-300 hover:scale-105 relative group" 
                data-testid="link-contact"
              >
                {t('nav.contact')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Language Switcher, Cart, Wishlist, Auth and Mobile Menu Button */}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                    <Globe size={18} />
                    <span className="hidden sm:inline text-xs font-medium">
                      {language.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem 
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'bg-gray-100' : ''}
                  >
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('ar')}
                    className={language === 'ar' ? 'bg-gray-100' : ''}
                  >
                    العربية
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className="relative text-gray-700 hover:text-red-500 transition-all duration-300 p-3 -m-3 hover:bg-gray-50 rounded-full hover-lift" 
                data-testid="link-wishlist"
                onClick={closeMobileMenu}
              >
                <Heart size={22} className={`transition-all duration-300 hover:scale-110 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce-in" data-testid="wishlist-count">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              
              {/* Cart */}
              <Link 
                href="/cart" 
                className="relative text-gray-700 hover:text-primary transition-all duration-300 p-3 -m-3 hover:bg-gray-50 rounded-full hover-lift" 
                data-testid="link-cart"
                onClick={closeMobileMenu}
              >
                <ShoppingCart size={22} className="transition-transform duration-300 hover:scale-110" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 gradient-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce-in" data-testid="cart-count">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Authentication */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                      <User size={20} />
                      <span className="hidden sm:inline">
                        {authState.user?.firstName}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>{t('nav.myaccount')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/my-orders" className="flex items-center space-x-2 w-full">
                        <Package size={16} />
                        <span>{t('nav.myorders')}</span>
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center space-x-2 w-full">
                          <Settings size={16} />
                          <span>{t('nav.admin')}</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut size={16} />
                      <span>{t('nav.signout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">{t('nav.signin')}</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">{t('nav.signup')}</Link>
                  </Button>
                </div>
              )}

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

          {/* Mobile Wishlist and Cart Summary */}
          <div className="mt-8 space-y-3">
            <div className="p-4 bg-red-50 rounded-xl">
              <Link 
                href="/wishlist" 
                className="flex items-center justify-between text-gray-700 hover:text-red-500 transition-colors"
                data-testid="link-mobile-wishlist"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center space-x-3">
                  <Heart size={20} className={wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                  <span className="font-medium">My Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
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
                  <span className="gradient-primary text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-bold">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
