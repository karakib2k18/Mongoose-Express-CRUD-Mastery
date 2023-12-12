/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

import { UserServices } from './user.service';
import {
  orderValidationSchema,
  userValidationSchema,
} from './user.zodvalidation';
import { UserModel } from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userValidationSchema.parse(req.body);
    const newUser = await UserServices.createUserIntoDB(validatedData);
    const { password, ...userWithoutPassword } = newUser.toObject();
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Validation error or Error creating user',
      error: {
        code: 400,
        description: error.errors ?? error.message,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Use aggregation to select specific fields
    const users = await UserModel.aggregate([
      {
        $project: {
          _id: 0, // Exclude _id field
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          address: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: 'Users fetched successfully!',
      data: users,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await UserServices.getUserById(userId);
    if (user) {
      const { orders, _id, password, ...userWithoutPassword } = user.toObject();
      res.json({
        success: true,
        message: 'User fetched successfully!',
        data: userWithoutPassword,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10) ?? 0; // Providing 0 as a default value if userId is undefined
    const myData = req.body;
    const updatedUser = await UserServices.updateUser(userId, myData);

    if (updatedUser.modifiedCount > 0) {
      const user = await UserServices.getUserById(userId);
      if (user) {
        const { orders, _id, password, ...userWithoutPassword } =
          user.toObject();
        // const { orders, _id, ...userWithoutPassword } = user.toObject();
        res.json({
          success: true,
          message: 'User updated successfully!',
          data: userWithoutPassword,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found',
          error: {
            code: 404,
            description: 'User not found!',
          },
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found or not modified',
        error: {
          code: 404,
          description: 'User not found or not modified!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await UserServices.getUserById(userId);

    if (user) {
      await UserServices.deleteUser(userId);
      res.json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'user not found',
        error: {
          code: 404,
          description: 'user not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const validatedData = orderValidationSchema.parse(req.body);
    await UserServices.addOrder(userId, validatedData);
    res.json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Validation error or Error creating order',
      error: {
        code: 400,
        description: error.errors ?? error.message,
      },
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const orders = await UserServices.getAllOrders(userId);

    if (orders?.length) {
      res.json({
        success: true,
        message: 'Orders fetched successfully!',
        data: { orders },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Orders not found',
        error: {
          code: 404,
          description: 'Orders not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const totalPrice = await UserServices.calculateTotalPrice(userId);
    res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error calculating total price',
      error: {
        code: 500,
        description: error.message,
      },
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  calculateTotalPrice,
};
