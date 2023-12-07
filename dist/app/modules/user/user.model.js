"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Schema for user's full name
const FullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
});
// Schema for user's address
const AddressSchema = new mongoose_1.Schema({
    street: { type: String, required: [true, 'Street is required'] },
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
});
// Schema for user's order
const OrderSchema = new mongoose_1.Schema({
    productName: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
});
// Main user schema
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    fullName: { type: FullNameSchema, required: [true, 'Full name is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: { type: Boolean, default: true },
    hobbies: { type: [String], default: [] },
    address: { type: AddressSchema, required: [true, 'Address is required'] },
    orders: { type: [OrderSchema], default: [] },
});
// Create the user model
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
