import mongoose from 'mongoose';
import { FavoriteModel } from '../../db/models/favorites/favorites.js';

export const getFavorites = async (userId: string) => {
  const favorites = await FavoriteModel.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'products',
        localField: 'products',
        foreignField: '_id',
        as: 'products',
      },
    },
    {
      $lookup: {
        from: 'reviews',
        localField: 'products._id',
        foreignField: 'productId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        products: {
          $map: {
            input: '$products',
            as: 'product',
            in: {
              _id: '$$product._id',
              name: '$$product.name',
              brief: '$$product.brief',
              price: '$$product.price',
              imgS: '$$product.imgS',
              averageRating: {
                $avg: {
                  $filter: {
                    input: '$reviews',
                    as: 'review',
                    cond: { $eq: ['$$review.productId', '$$product._id'] },
                  },
                },
              },
              ratingsCount: {
                $size: {
                  $filter: {
                    input: '$reviews',
                    as: 'review',
                    cond: { $eq: ['$$review.productId', '$$product._id'] },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        userId: 1,
        products: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return favorites[0] || null;
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
