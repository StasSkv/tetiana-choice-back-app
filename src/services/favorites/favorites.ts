import mongoose from 'mongoose';
import { FavoriteModel } from '../../db/models/favorites/favorites.js';

export const getFavorites = async (userId: string) => {
  const favorites = await FavoriteModel.findOne({ userId });
  return favorites;
};

export const addFavorite = async (userId: string, productId: mongoose.Types.ObjectId) => {
  const updated = await FavoriteModel.findOneAndUpdate(
    { userId },
    {
      $addToSet: { products: productId },
    },
    { new: true, upsert: true },
  );

  return updated;
};

export const removeFavorite = async (userId: string, productId: mongoose.Types.ObjectId) => {
  const favorite = await FavoriteModel.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } },
    { new: true },
  );
  return favorite;
};

export const clearFavorites = async (userId: string) => {
  const favorite = await FavoriteModel.findOneAndUpdate(
    { userId },
    { $set: { products: [] } },
    { new: true },
  );
  return favorite;
};