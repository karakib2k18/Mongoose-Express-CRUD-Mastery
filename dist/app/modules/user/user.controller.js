"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const user_zodvalidation_1 = require("./user.zodvalidation");
const user_model_1 = require("./user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validatedData = user_zodvalidation_1.userValidationSchema.parse(req.body);
    const result = yield user_model_1.UserModel.create(validatedData);
    // Exclude the password field from the response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _b = result.toObject(), { password } = _b, userWithoutPassword = __rest(_b, ["password"]);
    res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: userWithoutPassword,
    });
    try {
        const validatedData = user_zodvalidation_1.userValidationSchema.parse(req.body);
        const newUser = yield user_service_1.UserServices.createUserIntoDB(validatedData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: newUser,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Validation error or Error creating user',
            error: {
                code: 400,
                description: (_a = error.errors) !== null && _a !== void 0 ? _a : error.message,
            },
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use aggregation to select specific fields
        const users = yield user_model_1.UserModel.aggregate([
            {
                $project: {
                    _id: 0,
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = yield user_service_1.UserServices.getUserById(userId);
        if (user) {
            const _c = user.toObject(), { orders, _id, password } = _c, userWithoutPassword = __rest(_c, ["orders", "_id", "password"]);
            res.json({
                success: true,
                message: 'User fetched successfully!',
                data: userWithoutPassword,
            });
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const validatedData = user_zodvalidation_1.userValidationSchema.parse(req.body);
        const updatedUser = yield user_service_1.UserServices.updateUser(userId, validatedData);
        if (updatedUser.modifiedCount) {
            const user = yield user_service_1.UserServices.getUserById(userId);
            if (user) {
                const _d = user.toObject(), { orders, _id, password } = _d, userWithoutPassword = __rest(_d, ["orders", "_id", "password"]);
                res.json({
                    success: true,
                    message: 'User updated successfully!',
                    data: userWithoutPassword,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: 'User not found',
                    error: {
                        code: 404,
                        description: 'User not found!',
                    },
                });
            }
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = yield user_service_1.UserServices.getUserById(userId);
        if (user) {
            yield user_service_1.UserServices.deleteUser(userId);
            res.json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userId = parseInt(req.params.userId, 10);
        const validatedData = user_zodvalidation_1.orderValidationSchema.parse(req.body);
        yield user_service_1.UserServices.addOrder(userId, validatedData);
        res.json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validation error or Error creating order',
            error: {
                code: 400,
                description: (_e = error.errors) !== null && _e !== void 0 ? _e : error.message,
            },
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const orders = yield user_service_1.UserServices.getAllOrders(userId);
        if (orders === null || orders === void 0 ? void 0 : orders.length) {
            res.json({
                success: true,
                message: 'Orders fetched successfully!',
                data: { orders },
            });
        }
        else {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const totalPrice = yield user_service_1.UserServices.calculateTotalPrice(userId);
        res.json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice },
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating total price',
            error: {
                code: 500,
                description: error.message,
            },
        });
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    calculateTotalPrice,
};
