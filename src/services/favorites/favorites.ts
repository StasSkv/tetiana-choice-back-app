import mongoose from 'mongoose';
import { FavoriteModel } from '../../db/models/favorites/favorites.js';

export const getFavorites = async (userId: string) => {
  const favorites = await FavoriteModel.findOne({ userId }).populate(
    'products',
    'name brief price imgS rating price',
  );

  if (!favorites) return null;

  const productsWithAvgRating = favorites.products.map((product: any) => {
    const avgRating =
      product.rating.length > 0
        ? product.rating.reduce((acc: number, r: number) => acc + r, 0) / product.rating.length
        : 0;
    return {
      ...product.toObject(),
      averageRating: avgRating,
      ratingsCount: product.rating.length,
    };
  });

  return {
    ...favorites.toObject(),
    products: productsWithAvgRating,
  };
};


export const addFavorite = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  const updated = await FavoriteModel.findOneAndUpdate(
    { userId },
    {
      $addToSet: { products: productId },
    },
    { new: true, upsert: true },
  );

  return updated;
};

export const removeFavorite = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
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
