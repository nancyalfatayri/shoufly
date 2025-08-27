import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import { WishlistProvider } from "@/contexts/wishlist-context";
import { AuthProvider } from "@/contexts/auth-context";
import { LanguageProvider } from "@/contexts/language-context";
import Home from "@/pages/home";
import MerchantPage from "@/pages/merchant";
import CartPage from "@/pages/cart";
import EnhancedCheckoutPage from "@/pages/enhanced-checkout";
import ContactPage from "@/pages/contact";
import AboutPage from "@/pages/about";
import WishlistPage from "@/pages/wishlist";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";
import ResetPasswordPage from "@/pages/reset-password";
import AdminDashboard from "@/pages/admin-dashboard";
import MyOrdersPage from "@/pages/my-orders";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/merchant/:id" component={MerchantPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={EnhancedCheckoutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/my-orders" component={MyOrdersPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
