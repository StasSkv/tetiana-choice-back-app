import { Router } from 'express';
import { getCartController, updateCartController, removeFromCartController, clearCartController, addToCartController } from '../../controllers/cart/cart.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getCartController));
router.post('/', ctrlWrapper(addToCartController));
router.put('/', ctrlWrapper(updateCartController));
router.delete('/', ctrlWrapper(removeFromCartController));
router.put('/', ctrlWrapper(clearCartController));

export default router;