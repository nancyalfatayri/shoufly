import { Link } from "wouter";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      
      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Contact Header */}
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
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2" data-testid="text-contact-title">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base text-gray-600" data-testid="text-contact-subtitle">
              Get in touch with us for any questions or support
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-contact-info">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="text-shoufly-blue mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Phone Numbers</h3>
                    <div className="space-y-1">
                      <a 
                        href="tel:+96171836898" 
                        className="block text-shoufly-blue hover:text-blue-600 transition-colors text-lg font-medium"
                        data-testid="link-phone-1"
                      >
                        +961 71 836 898
                      </a>
                      <a 
                        href="tel:+96171582442" 
                        className="block text-shoufly-blue hover:text-blue-600 transition-colors text-lg font-medium"
                        data-testid="link-phone-2"
                      >
                        +961 71 582 442
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="text-shoufly-blue mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:support@shoufly.com" 
                      className="text-shoufly-blue hover:text-blue-600 transition-colors"
                      data-testid="link-email"
                    >
                      support@shoufly.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-shoufly-blue mr-4 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Service Area</h3>
                    <p className="text-gray-600" data-testid="text-service-area">
                      Lebanon - Local delivery available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-quick-contact">
                Quick Contact
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-shoufly-blue/10 border border-shoufly-blue/20 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Phone className="text-shoufly-blue mr-3" size={20} />
                    <h3 className="font-medium text-shoufly-blue">Call Us Now</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Our customer service team is available to help you with your orders
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+96171836898"
                      className="block w-full"
                    >
                      <Button 
                        className="w-full bg-shoufly-blue hover:bg-blue-600 text-white text-sm font-medium min-h-[44px]"
                        data-testid="button-call-1"
                      >
                        Call +961 71 836 898
                      </Button>
                    </a>
                    <a 
                      href="tel:+96171582442"
                      className="block w-full"
                    >
                      <Button 
                        variant="outline"
                        className="w-full border-shoufly-blue text-shoufly-blue hover:bg-shoufly-blue hover:text-white text-sm font-medium min-h-[44px]"
                        data-testid="button-call-2"
                      >
                        Call +961 71 582 442
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-shoufly-green/10 border border-shoufly-green/20 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Mail className="text-shoufly-green mr-3" size={20} />
                    <h3 className="font-medium text-shoufly-green">Email Support</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Send us an email and we'll get back to you within 24 hours
                  </p>
                  <a 
                    href="mailto:support@shoufly.com"
                    className="block w-full"
                  >
                    <Button 
                      className="w-full bg-shoufly-green hover:bg-green-600 text-white text-sm font-medium min-h-[44px]"
                      data-testid="button-email"
                    >
                      Send Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6" data-testid="text-business-hours">
              Business Hours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Customer Service</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">12:00 PM - 5:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Delivery Service</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span className="font-medium">8:00 AM - 10:00 PM</span>
                  </div>
                  <div className="mt-3 p-3 bg-shoufly-green/10 rounded-lg">
                    <p className="text-shoufly-green font-medium text-center">
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