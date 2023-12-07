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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (validatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(validatedData);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.UserModel.find();
    return users;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = yield user_model_1.UserModel.findOne({ userId });
    return userID;
});
const updateUser = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.UserModel.updateOne({ userId }, userData, {
        new: true,
    });
    return updatedUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.UserModel.deleteOne({ userId });
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.UserModel.findOne({ userId });
    if (user) {
        (_a = user === null || user === void 0 ? void 0 : user.orders) === null || _a === void 0 ? void 0 : _a.push(orderData);
        yield user.save();
    }
    return user;
});
const getAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ userId });
    return user ? user.orders : [];
});
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = yield user_model_1.UserModel.findOne({ userId });
    if (user) {
        const totalPrice = (_b = user === null || user === void 0 ? void 0 : user.orders) === null || _b === void 0 ? void 0 : _b.reduce((total, order) => total + order.price * order.quantity, 0);
        return totalPrice;
    }
    return 0;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    calculateTotalPrice,
};
