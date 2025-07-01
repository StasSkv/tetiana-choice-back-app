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

const router = express.Router();

router.get('/', ctrlWrapper(getAllReviewsController));
router.get('/user/:userId', ctrlWrapper(getReviewsByUserController));
router.get('/product/:productId', ctrlWrapper(getReviewsByProductController));
router.post(
  '/',
  validateBody(createReviewSchema),
  ctrlWrapper(createReviewController),
);

export default router;
