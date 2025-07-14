import express from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import {
  getAllReviewsController,
  getReviewsByProductController,
  getReviewsByUserController,
  createReviewController,
} from '../../controllers/reviews/reviews.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { createReviewSchema } from '../../validation/reviews.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllReviewsController));
router.get('/user-reviews', authenticate, ctrlWrapper(getReviewsByUserController));
router.get('/product/:productId', ctrlWrapper(getReviewsByProductController));
router.post(
  '/',
  authenticate,
  validateBody(createReviewSchema),
  ctrlWrapper(createReviewController),
);

export default router;
