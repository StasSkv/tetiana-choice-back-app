import { Router } from 'express';
import {
  getCartController,
  addToCartController,
  clearCartController,
  removeFromCartController,
  updateCartController,
} from '../../controllers/cart/cart.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  createAndDeleteCartSchema,
  updateCartSchema,
} from '../../validation/cart.js';
import { validateBody } from '../../middlewares/validateBody.js';

const router = Router();

router.get('/', ctrlWrapper(getCartController));
router.post(
  '/',
  validateBody(createAndDeleteCartSchema),
  ctrlWrapper(addToCartController),
);
router.patch(
  '/',
  validateBody(updateCartSchema),
  ctrlWrapper(updateCartController),
);
router.delete(
  '/',
  validateBody(createAndDeleteCartSchema),
  ctrlWrapper(removeFromCartController),
);
router.put('/', ctrlWrapper(clearCartController));

export default router;
