import { Schema, model } from 'mongoose';
import { IUser, IFullName, IAddress, IOrder } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

// Schema for user's full name
const FullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

// Schema for user's address
const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

// Schema for user's order
const OrderSchema = new Schema<IOrder>({
  productName: { type: String, required: [true, 'Product name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

// Main user schema
const UserSchema = new Schema<IUser>({
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

//Encrypt & pre save middleware/hook: will work on create on save function
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // documents
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );

  next();
});

//post save middleware
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Create the user model
export const UserModel = model<IUser>('User', UserSchema);
