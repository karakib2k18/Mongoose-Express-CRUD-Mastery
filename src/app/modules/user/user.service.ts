import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (validatedData: IUser) => {
  const result = await UserModel.create(validatedData);
  return result;
};

const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};

const getUserById = async (userId: number) => {
  const userID = await UserModel.findOne({ userId });
  return userID;
};

const updateUser = async (userId: number, userData: IUser) => {
  const updatedUser = await UserModel.updateOne({ userId }, userData, {
    new: true,
  });
  return updatedUser;
};

const deleteUser = async (userId: number) => {
  await UserModel.deleteOne({ userId });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrder = async (userId: number, orderData: any) => {
  const user = await UserModel.findOne({ userId });

  if (user) {
    user?.orders?.push(orderData);
    await user.save();
  }
  return user;
};

const getAllOrders = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  return user ? user.orders : [];
};

const calculateTotalPrice = async (userId: number) => {
  const user = await UserModel.findOne({ userId });
  if (user) {
    const totalPrice = user?.orders?.reduce(
      (total, order) => total + order.price * order.quantity,
      0,
    );
    return totalPrice;
  }
  return 0;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
};
