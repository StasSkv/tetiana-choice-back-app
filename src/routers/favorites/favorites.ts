import { Router } from 'express';
import {
  addFavoriteController,
  clearFavoritesController,
  getFavoriteNotAuthorizedController,
  getFavoritesController,
  removeFavoriteController,
} from '../../controllers/favorites/favorites.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { validateBody } from '../../middlewares/validateBody.js';
import {
  createAndDeleteFavoritesSchema,
  fetchFavoritesFromLocalSchema,
} from '../../validation/favorites.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getFavoritesController));
router.post(
  '/',
  authenticate,
  validateBody(createAndDeleteFavoritesSchema),
  ctrlWrapper(addFavoriteController),
);
router.delete(
  '/',
  authenticate,
  validateBody(createAndDeleteFavoritesSchema),
  ctrlWrapper(removeFavoriteController),
);
router.put('/', authenticate, ctrlWrapper(clearFavoritesController));

router.post(
  '/not-authorized',
  validateBody(fetchFavoritesFromLocalSchema),
  ctrlWrapper(getFavoriteNotAuthorizedController),
);

export default router;
