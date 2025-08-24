import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";

export function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer" data-testid="link-home">
            <img
              src="@assets/image_1756062618411.png"
              alt="Shoufly logo"
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-merchants">
                Merchants
              </a>
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-about">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-contact">
                Contact
              </a>
            </div>
            <Link href="/cart" className="relative text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-cart">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shoufly-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" data-testid="cart-count">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
