import { Router } from 'express';
import { createOrderController } from '../../controllers/orders/orders.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import createOrderSchema from '../../validation/order.js';

const router = Router();

router.post(
  '/',
  validateBody(createOrderSchema),
  ctrlWrapper(createOrderController),
);

export default router;
