import { Router } from 'express';
import {
  productByIdController,
  productsController,
} from '../../controllers/products/products.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(productsController));
router.get('/:productId', ctrlWrapper(productByIdController));

export default router;
