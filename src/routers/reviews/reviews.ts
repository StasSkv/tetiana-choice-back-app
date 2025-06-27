import express from 'express';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { getAllReviewsController, getReviewsByProductController, getReviewsByUserController, createReviewController } from '../../controllers/reviews/reviews.js';


const router = express.Router();

router.get('/', ctrlWrapper(getAllReviewsController));
router.get('/user/:userId', ctrlWrapper(getReviewsByUserController));
router.get('/product/:productId', ctrlWrapper(getReviewsByProductController));
router.post('/', ctrlWrapper(createReviewController));

export default router;