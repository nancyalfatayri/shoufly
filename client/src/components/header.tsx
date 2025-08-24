import { Link } from "wouter";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer" data-testid="link-home">
            <svg
              width="32"
              height="32"
              viewBox="0 0 200 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-auto mr-3"
            >
              {/* Bag Icon */}
              <path d="M15 15h10v5h-10z" fill="#4A9EDB"/>
              <path d="M12 20h20v25H12z" fill="#4A9EDB"/>
              <path d="M16 15h8" stroke="#4A9EDB" strokeWidth="2"/>
              {/* Arrow Icon */}
              <path d="M38 22l8 8-8 8M38 30h16" stroke="#7BB842" strokeWidth="3" fill="none"/>
              <path d="M34 26h4M34 34h4" stroke="#7BB842" strokeWidth="2" fill="none"/>
              {/* Shoufly Text */}
              <text x="70" y="35" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="600" fill="#4A9EDB">Shoufly</text>
            </svg>
            <span className="text-2xl font-bold text-shoufly-blue">Shoufly</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-merchants">
              Merchants
            </a>
            <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-about">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-shoufly-blue transition-colors" data-testid="link-contact">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
