import express from 'express';
import { eq, desc } from 'drizzle-orm';
import { db } from './storage';
import { orders, orderItems, users } from '@shared/schema';
import { checkoutSchema } from '@shared/schema';
import { authenticateToken, requireAdmin, AuthenticatedRequest } from './auth';
import { sendOrderNotification, sendOrderConfirmation } from './notifications';

const router = express.Router();

// Create new order (checkout)
router.post('/checkout', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const validatedData = checkoutSchema.parse(req.body);
    const userId = req.userId!;
    
    // Calculate total
    const total = validatedData.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + (price * item.quantity);
    }, 0);

    // Create order
    const newOrder = await db.insert(orders).values({
      userId,
      total: total.toFixed(2),
      status: 'pending',
      deliveryAddress: validatedData.deliveryAddress,
      phone: validatedData.phone,
      notes: validatedData.notes,
    }).returning();

    // Create order items
    const orderItemsData = validatedData.items.map(item => ({
      orderId: newOrder[0].id,
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      merchantId: item.merchantId,
    }));

    await db.insert(orderItems).values(orderItemsData);

    // Get complete order with items for notifications
    const completeOrder = {
      ...newOrder[0],
      items: validatedData.items,
    };

    // Send notifications  
    await sendOrderNotification({...completeOrder, notes: completeOrder.notes || undefined}, 'new_order');
    await sendOrderConfirmation({...completeOrder, notes: completeOrder.notes || undefined}, validatedData.phone);

    res.status(201).json({
      message: 'Order placed successfully',
      order: completeOrder
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid order data', errors: error.errors });
    }
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Failed to process order' });
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId!;
    
    const userOrders = await db.select().from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));

    // Get order items for each order
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        return { ...order, items };
      })
    );

    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Get single order details
router.get('/:orderId', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const userId = req.userId!;
    
    const order = await db.select().from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
      
    if (!order.length) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order (unless admin)
    if (req.user?.role !== 'admin' && order[0].userId !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
    
    res.json({ 
      order: { 
        ...order[0], 
        items 
      } 
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// Admin: Get all orders
router.get('/', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const allOrders = await db.select().from(orders)
      .orderBy(desc(orders.createdAt));

    // Get order items and user info for each order
    const ordersWithDetails = await Promise.all(
      allOrders.map(async (order) => {
        const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
        const user = await db.select().from(users).where(eq(users.id, order.userId)).limit(1);
        
        return { 
          ...order, 
          items,
          customer: user.length > 0 ? {
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email
          } : null
        };
      })
    );

    res.json({ orders: ordersWithDetails });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Admin: Update order status
router.patch('/:orderId/status', authenticateToken, requireAdmin, async (req: AuthenticatedRequest, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await db.update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, orderId))
      .returning();

    if (!updatedOrder.length) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Get complete order details for notification
    const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
    const completeOrder = { ...updatedOrder[0], items };

    // Send status update notification
    await sendOrderNotification({...completeOrder, notes: completeOrder.notes || undefined}, 'status_update');

    res.json({ 
      message: 'Order status updated', 
      order: completeOrder 
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

export default router;