import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-inter">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Contact Header */}
        <div className="flex items-center mb-8 sm:mb-12">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mr-4 text-primary hover:text-primary-hover p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover-lift border border-gray-200/50"
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="text-contact-title">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium" data-testid="text-contact-subtitle">
              Get in touch with us for any questions or support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8" data-testid="text-contact-info">
                  Contact Information
                </h2>
                
                <div className="space-y-8">
                  <div className="bg-gray-50/50 hover:bg-white p-6 border border-gray-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-3 rounded-full mr-6">
                        <Phone className="text-primary h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">Phone Numbers</h3>
                        <div className="space-y-3">
                          <a 
                            href="tel:+96171836898" 
                            className="block text-primary hover:text-primary-hover transition-colors text-xl font-semibold"
                            data-testid="link-phone-1"
                          >
                            +961 71 836 898
                          </a>
                          <a 
                            href="tel:+96171582442" 
                            className="block text-primary hover:text-primary-hover transition-colors text-xl font-semibold"
                            data-testid="link-phone-2"
                          >
                            +961 71 582 442
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50/50 hover:bg-white p-6 border border-gray-200 rounded-2xl hover:border-secondary/30 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start">
                      <div className="bg-secondary/20 p-3 rounded-full mr-6">
                        <MapPin className="text-secondary h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-3">Service Area</h3>
                        <p className="text-gray-700 text-lg font-medium" data-testid="text-service-area">
                          Lebanon - Dmit & Kfarhim Al Shouf
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="lg:col-span-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden sticky top-8">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8" data-testid="text-quick-contact">
                  Quick Contact
                </h2>
                
                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/20 p-3 rounded-full mr-4">
                      <Phone className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-primary text-lg">Call Us Now</h3>
                  </div>
                  <p className="text-gray-600 text-base mb-6 font-medium">
                    Our customer service team is available to help you with your orders
                  </p>
                  <div className="space-y-4">
                    <a 
                      href="tel:+96171836898"
                      className="block w-full"
                    >
                      <Button 
                        className="w-full button-primary py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl"
                        data-testid="button-call-1"
                      >
                        <Phone className="h-5 w-5 mr-3" />
                        Call +961 71 836 898
                      </Button>
                    </a>
                    <a 
                      href="tel:+96171582442"
                      className="block w-full"
                    >
                      <Button 
                        variant="outline"
                        className="w-full py-4 text-lg font-bold rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        data-testid="button-call-2"
                      >
                        <Phone className="h-5 w-5 mr-3" />
                        Call +961 71 582 442
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8" data-testid="text-business-hours">
              Business Hours
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Customer Service</h3>
                <div className="space-y-3 text-base text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Delivery Service</h3>
                <div className="space-y-3 text-base text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span className="font-semibold text-gray-900">8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20 rounded-xl">
                    <p className="text-secondary font-bold text-center text-lg">
                      💰 Cash on Delivery Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}