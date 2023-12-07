import { Request, Response } from 'express';

import { UserServices } from './user.service';
import {
  orderValidationSchema,
  userValidationSchema,
} from './user.zodvalidation';
import { UserModel } from './user.model';

const createUser = async (req: Request, res: Response) => {
  const validatedData = userValidationSchema.parse(req.body);
  const result = await UserModel.create(validatedData);
  res.status(200).json({
    success: true,
    message: 'User created successfully!',
    data: result,
  });
  try {
    const validatedData = userValidationSchema.parse(req.body);
    const newUser = await UserServices.createUserIntoDB(validatedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: newUser,
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
    const users = await UserServices.getAllUsers();
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
      res.json({
        success: true,
        message: 'User fetched successfully!',
        data: user,
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
    const userId = parseInt(req.params.userId, 10);
    const validatedData = userValidationSchema.parse(req.body);
    const updatedUser = await UserServices.updateUser(userId, validatedData);

    if (updatedUser) {
      res.json({
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
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
    await UserServices.deleteUser(userId);
    res.json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
