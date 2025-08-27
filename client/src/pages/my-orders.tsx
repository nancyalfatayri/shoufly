import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Clock,
  CheckCircle,
  ChefHat,
  Truck,
  XCircle,
  Package,
  MapPin,
  Phone
} from "lucide-react";
import { useLocation } from "wouter";

interface OrderItem {
  id: number;
  productName: string;
  price: string;
  quantity: number;
  merchantId: string;
}

interface Order {
  id: number;
  total: string;
  status: string;
  deliveryAddress: string;
  phone: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  preparing: { label: 'Preparing', color: 'bg-purple-100 text-purple-800', icon: ChefHat },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-800', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function MyOrdersPage() {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/orders/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        setError('Failed to load your orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600">Track your delivery orders</p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 text-center mb-4">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <button 
                onClick={() => setLocation('/')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Start Shopping →
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = config?.icon || Clock;
              
              return (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={config?.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config?.label || order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Order Details */}
                      <div>
                        <h4 className="font-medium mb-3">Order Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-600">Delivery to:</span>
                            <span className="ml-2">{order.deliveryAddress}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2">{order.phone}</span>
                          </div>
                          {order.notes && (
                            <div className="text-sm">
                              <span className="text-gray-600">Notes:</span>
                              <span className="ml-2">{order.notes}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t">
                            <div className="flex justify-between items-center font-medium">
                              <span>Total:</span>
                              <span className="text-lg text-primary">${order.total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Items */}
                      <div>
                        <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{item.productName}</span>
                                <span className="text-gray-500 ml-2">x{item.quantity}</span>
                              </div>
                              <span className="font-medium">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}