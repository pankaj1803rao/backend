const { z } = require("zod");

const createProductSchema = z
  .object({
    name: z.string().trim().min(3).max(60),
    price: z.number().min(0).max(100000),

    image: z.string().trim().url().optional(), // optional because schema has default
    description: z.string().trim().min(10).max(2000),

    category: z.string().trim().min(2).max(40),
    quantity: z.number().int().min(0),

    rating: z.number().min(0).max(5).optional(),
    isActive: z.boolean().optional(),
  })
  .strict(); // ✅ blocks extra/unknown fields

const updateProductSchema = z
  .object({
    name: z.string().trim().min(3).max(60).optional(),
    price: z.number().min(0).max(100000).optional(),
    image: z.string().trim().url().optional(),
    description: z.string().trim().min(10).max(2000).optional(),
    category: z.string().trim().min(2).max(40).optional(),
    quantity: z.number().int().min(0).optional(),
    rating: z.number().min(0).max(5).optional(),
    isActive: z.boolean().optional(),
  })
  .strict(); // ✅ blocks extra/unknown fields

module.exports = { createProductSchema, updateProductSchema };
