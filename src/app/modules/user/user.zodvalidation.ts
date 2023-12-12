import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

const addressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
});

const orderValidationSchema = z.object({
  productName: z.string().min(1).max(100),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(50),
  password: z.string(), // Adjust the minimum length as needed
  fullName: fullNameValidationSchema,
  age: z.number().min(18).max(99),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

//
export { userValidationSchema, orderValidationSchema };
