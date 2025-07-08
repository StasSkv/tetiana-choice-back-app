import { Router } from 'express';
import {
  getCartController,
  addToCartController,
  clearCartController,
  removeFromCartController,
  updateCartController,
  getCartNotAuthorizedController,
} from '../../controllers/cart/cart.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  createAndDeleteCartSchema,
  updateCartSchema,
  cartNotAuthorizedSchema,
} from '../../validation/cart.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getCartController));
router.post(
  '/',
  authenticate,
  validateBody(createAndDeleteCartSchema),
  ctrlWrapper(addToCartController),
);
router.patch(
  '/',
  authenticate,
  validateBody(updateCartSchema),
  ctrlWrapper(updateCartController),
);
router.delete(
  '/',
  authenticate,
  validateBody(createAndDeleteCartSchema),
  ctrlWrapper(removeFromCartController),
);
router.put('/', authenticate, ctrlWrapper(clearCartController));

router.post(
  '/not-authorized',
  validateBody(cartNotAuthorizedSchema),
  ctrlWrapper(getCartNotAuthorizedController),
);

export default router;
