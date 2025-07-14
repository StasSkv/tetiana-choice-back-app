import { Router } from 'express';
import {
  createOrderController,
  createOrderNotAuthController,
  getUserOrdersController,
} from '../../controllers/orders/orders.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import createOrderSchema from '../../validation/order.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createOrderSchema),
  ctrlWrapper(createOrderController),
);

router.post(
  '/not-auth',
  validateBody(createOrderSchema),
  ctrlWrapper(createOrderNotAuthController),
);

router.get('/user-orders', authenticate, ctrlWrapper(getUserOrdersController));

export default router;
