import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import shouflylLogo from "@assets/image_1756062618411.png";

export function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="flex items-center cursor-pointer" data-testid="link-home">
            <img
              src={shouflylLogo}
              alt="Shoufly logo"
              className="h-14 sm:h-16 w-auto"
            />
          </Link>
          <nav className="flex items-center space-x-4 sm:space-x-8">
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors text-sm lg:text-base" data-testid="link-merchants">
                Merchants
              </a>
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors text-sm lg:text-base" data-testid="link-about">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors text-sm lg:text-base" data-testid="link-contact">
                Contact
              </a>
            </div>
            <Link href="/cart" className="relative text-gray-600 hover:text-shoufly-blue transition-colors p-2 -m-2" data-testid="link-cart">
              <ShoppingCart size={20} className="sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-shoufly-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" data-testid="cart-count">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
