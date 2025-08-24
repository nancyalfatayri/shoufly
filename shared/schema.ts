import { z } from "zod";

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

export type Merchant = z.infer<typeof merchantSchema>;
export type Product = z.infer<typeof productSchema>;
