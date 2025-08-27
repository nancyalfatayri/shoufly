import { z } from "zod";
import { pgTable, varchar, text, decimal, timestamp, serial, pgEnum } from "drizzle-orm/pg-core";

// Database Tables
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const merchants = pgTable('merchants', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  image: varchar('image', { length: 500 }),
  buttonColor: varchar('button_color', { length: 10 }).notNull(),
});

export const products = pgTable('products', {
  id: varchar('id', { length: 50 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: varchar('price', { length: 20 }).notNull(),
  merchantId: varchar('merchant_id', { length: 50 }).notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  deliveryAddress: text('delivery_address').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: serial('order_id').notNull(),
  productId: varchar('product_id', { length: 50 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  price: varchar('price', { length: 20 }).notNull(),
  quantity: serial('quantity').notNull(),
  merchantId: varchar('merchant_id', { length: 50 }).notNull(),
});

export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  used: timestamp('used'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Zod Schemas
export const merchantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  buttonColor: z.enum(['blue', 'green']),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  merchantId: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  role: z.enum(['user', 'admin']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  total: z.string(),
  status: z.enum(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']),
  deliveryAddress: z.string(),
  phone: z.string(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z.array(z.object({
    id: z.number(),
    productId: z.string(),
    productName: z.string(),
    price: z.string(),
    quantity: z.number(),
    merchantId: z.string(),
  })).optional(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});

export const checkoutSchema = z.object({
  deliveryAddress: z.string().min(1),
  phone: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    price: z.string(),
    quantity: z.number().min(1),
    merchantId: z.string(),
  })).min(1),
});

export type Merchant = z.infer<typeof merchantSchema>;
export type Product = z.infer<typeof productSchema>;
export type User = z.infer<typeof userSchema>;
export type Order = z.infer<typeof orderSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
