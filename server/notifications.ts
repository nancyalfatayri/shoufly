import twilio from 'twilio';
import { Order } from '@shared/schema';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;
const ADMIN_WHATSAPP = process.env.ADMIN_WHATSAPP;
const DELIVERY_WHATSAPP = process.env.DELIVERY_WHATSAPP;

// Only initialize Twilio if credentials are provided
let client: any = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_ACCOUNT_SID.startsWith('AC')) {
  client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export const sendOrderNotification = async (order: Order & { items?: any[] }, type: 'new_order' | 'status_update') => {
  // Skip if Twilio is not configured
  if (!client || !TWILIO_PHONE || !ADMIN_WHATSAPP || !DELIVERY_WHATSAPP) {
    console.log('WhatsApp notifications disabled - Twilio not configured');
    return;
  }
  
  try {
    const itemsList = order.items?.map(item => 
      `• ${item.productName} x${item.quantity} - ${item.price}`
    ).join('\n') || '';

    let message = '';
    let recipients: string[] = [];

    if (type === 'new_order') {
      message = `🍕 *NEW ORDER #${order.id}*\n\n` +
                `👤 Customer: ${order.phone}\n` +
                `📍 Address: ${order.deliveryAddress}\n` +
                `💰 Total: $${order.total}\n\n` +
                `📦 *Items:*\n${itemsList}\n\n` +
                `📝 Notes: ${order.notes || 'None'}\n\n` +
                `⏰ Ordered at: ${new Date(order.createdAt).toLocaleString()}`;
      
      recipients = [ADMIN_WHATSAPP, DELIVERY_WHATSAPP];
    } else if (type === 'status_update') {
      const statusEmojis: Record<string, string> = {
        pending: '⏳',
        confirmed: '✅',
        preparing: '👨‍🍳',
        out_for_delivery: '🚚',
        delivered: '📦',
        cancelled: '❌'
      };
      
      message = `${statusEmojis[order.status]} *ORDER #${order.id} UPDATE*\n\n` +
                `Status: *${order.status.replace('_', ' ').toUpperCase()}*\n` +
                `Customer: ${order.phone}\n` +
                `Total: $${order.total}`;
      
      recipients = [ADMIN_WHATSAPP, DELIVERY_WHATSAPP];
    }

    // Send to all recipients
    const promises = recipients.map(recipient => 
      client.messages.create({
        from: `whatsapp:${TWILIO_PHONE}`,
        to: `whatsapp:${recipient}`,
        body: message
      })
    );

    await Promise.all(promises);
    console.log(`WhatsApp notifications sent for order #${order.id}`);
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
  }
};

export const sendOrderConfirmation = async (order: Order & { items?: any[] }, customerPhone: string) => {
  // Skip if Twilio is not configured
  if (!client || !TWILIO_PHONE) {
    console.log('Order confirmation SMS disabled - Twilio not configured');
    return;
  }
  
  try {
    const itemsList = order.items?.map(item => 
      `• ${item.productName} x${item.quantity} - ${item.price}`
    ).join('\n') || '';

    const message = `🎉 *Order Confirmed!*\n\n` +
                   `Order #${order.id}\n` +
                   `Total: $${order.total}\n\n` +
                   `📦 *Items:*\n${itemsList}\n\n` +
                   `📍 Delivery to: ${order.deliveryAddress}\n\n` +
                   `We'll notify you when your order is out for delivery!`;

    await client.messages.create({
      from: `whatsapp:${TWILIO_PHONE}`,
      to: `whatsapp:${customerPhone}`,
      body: message
    });

    console.log(`Order confirmation sent to customer: ${customerPhone}`);
  } catch (error) {
    console.error('Failed to send order confirmation:', error);
  }
};