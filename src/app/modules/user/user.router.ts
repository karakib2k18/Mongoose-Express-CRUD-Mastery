import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/:userId/orders', UserController.addOrder);
router.get('/:userId/orders', UserController.getAllOrders);
router.get('/:userId/orders/total-price', UserController.calculateTotalPrice);

export const UserRoutes = router;
