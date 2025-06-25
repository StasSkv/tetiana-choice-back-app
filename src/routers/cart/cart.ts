import { Router } from 'express';
import { getCartController, addToCartController, clearCartController, removeFromCartController, updateCartController } from '../../controllers/cart/cart.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getCartController));
router.post('/', ctrlWrapper(addToCartController));
router.patch('/', ctrlWrapper(updateCartController));
router.delete('/', ctrlWrapper(removeFromCartController));
router.put('/', ctrlWrapper(clearCartController));

export default router;