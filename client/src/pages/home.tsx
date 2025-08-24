import { Header } from "@/components/header";
import { MerchantCard } from "@/components/merchant-card";
import { merchants } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" data-testid="text-hero-title">
            Shop Local, <span className="text-shoufly-blue">Delivered Fast</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2" data-testid="text-hero-description">
            Shop from your favorite local stores and get everything delivered to your door
          </p>
        </section>

        {/* Merchants Grid */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8" data-testid="text-featured-merchants">
            Featured Merchants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-testid="grid-merchants">
            {merchants.map((merchant) => (
              <MerchantCard key={merchant.id} merchant={merchant} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p data-testid="text-footer-copyright">&copy; 2024 Shoufly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
