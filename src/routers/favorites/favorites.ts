import { Router } from 'express';
import {
  addFavoriteController,
  clearFavoritesController,
  getFavoritesController,
  removeFavoriteController,
} from '../../controllers/favorites/favorites.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getFavoritesController));
router.post('/', ctrlWrapper(addFavoriteController));
router.delete('/', ctrlWrapper(removeFavoriteController));
router.put('/', ctrlWrapper(clearFavoritesController));

export default router;
