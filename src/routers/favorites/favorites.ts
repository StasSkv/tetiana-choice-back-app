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
import { createAndDeleteFavoritesSchema, fetchFavoritesFromLocalSchema } from '../../validation/favorites.js';

const router = Router();

router.get('/', ctrlWrapper(getFavoritesController));
router.post(
  '/',
  validateBody(createAndDeleteFavoritesSchema),
  ctrlWrapper(addFavoriteController),
);
router.delete(
  '/',
  validateBody(createAndDeleteFavoritesSchema),
  ctrlWrapper(removeFavoriteController),
);
router.put('/', ctrlWrapper(clearFavoritesController));

router.post(
  '/not-authorized',
  validateBody(fetchFavoritesFromLocalSchema),
  ctrlWrapper(getFavoriteNotAuthorizedController),
);

export default router;
