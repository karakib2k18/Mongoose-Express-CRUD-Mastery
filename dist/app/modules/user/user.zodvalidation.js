"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(50),
    lastName: zod_1.z.string().min(1).max(50),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(100),
    city: zod_1.z.string().min(1).max(50),
    country: zod_1.z.string().min(1).max(50),
});
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(100),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.orderValidationSchema = orderValidationSchema;
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1).max(50),
    password: zod_1.z.string(), // Adjust the minimum length as needed
    fullName: fullNameValidationSchema,
    age: zod_1.z.number().min(18).max(99),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderValidationSchema).optional(),
});
exports.userValidationSchema = userValidationSchema;
