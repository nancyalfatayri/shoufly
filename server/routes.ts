import type { Express } from "express";
import { createServer, type Server } from "http";
import { db, sampleMerchants, sampleProducts } from "./storage";
import { merchants, products } from "@shared/schema";
import authRoutes from "./auth-routes";
import orderRoutes from "./order-routes";
import { authenticateToken, requireAdmin } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.use('/api/auth', authRoutes);
  
  // Order routes
  app.use('/api/orders', orderRoutes);
  
  // Merchants API
  app.get('/api/merchants', async (req, res) => {
    try {
      // Try to get from database first, fall back to sample data
      let merchantsData = await db.select().from(merchants);
      
      if (merchantsData.length === 0) {
        // Insert sample data if database is empty
        await db.insert(merchants).values(sampleMerchants);
        merchantsData = sampleMerchants;
      }
      
      res.json(merchantsData);
    } catch (error) {
      console.error('Error fetching merchants:', error);
      // Fallback to sample data if database fails
      res.json(sampleMerchants);
    }
  });
  
  // Products API
  app.get('/api/products', async (req, res) => {
    try {
      const merchantId = req.query.merchantId as string;
      
      // Try to get from database first, fall back to sample data
      let productsData = await db.select().from(products);
      
      if (productsData.length === 0) {
        // Insert sample data if database is empty
        await db.insert(products).values(sampleProducts);
        productsData = sampleProducts;
      }
      
      // Filter by merchant if specified
      if (merchantId) {
        productsData = productsData.filter(p => p.merchantId === merchantId);
      }
      
      res.json(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to sample data
      let productsData = sampleProducts;
      const merchantId = req.query.merchantId as string;
      if (merchantId) {
        productsData = productsData.filter(p => p.merchantId === merchantId);
      }
      res.json(productsData);
    }
  });
  
  // Admin Dashboard API
  app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
    try {
      // Get basic stats for admin dashboard
      const totalOrders = await db.select({ count: 1 }).from(merchants);
      const totalUsers = await db.select({ count: 1 }).from(merchants);
      
      res.json({
        totalOrders: totalOrders.length || 0,
        totalUsers: totalUsers.length || 0,
        totalMerchants: sampleMerchants.length,
        totalProducts: sampleProducts.length
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      res.status(500).json({ message: 'Failed to fetch statistics' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
