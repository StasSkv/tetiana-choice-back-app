import mongoose from 'mongoose';
import { FavoriteModel } from '../../db/models/favorites/favorites.js';
import { ProductModel } from '../../db/models/product/product.js';

export const getFavorites = async (userId: string) => {
  const favoritesProducts = await FavoriteModel.findOne({ userId });
  if (!favoritesProducts || favoritesProducts.products.length === 0) {
    return { favoritesProducts: [], favoritesIds: [] };
  }
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

export const getFavoritesNotAuthorized = async (productIds: string[]) => {
  const objectIds = productIds.map((id) => new mongoose.Types.ObjectId(id));

  const products = await ProductModel.aggregate([
    { $match: { _id: { $in: objectIds } } },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'productId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: {
          $avg: '$reviews.rating',
        },
        ratingsCount: {
          $size: '$reviews',
        },
      },
    },
    {
      $project: {
        name: 1,
        brief: 1,
        price: 1,
        imgS: 1,
        averageRating: 1,
        ratingsCount: 1,
      },
    },
  ]);

  return products;
};

export const addFavorite = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  await FavoriteModel.findOneAndUpdate(
    { userId },
    {
      $addToSet: { products: productId },
    },
    { new: true, upsert: true },
  );

  return await getFavorites(userId);
};

export const removeFavorite = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  await FavoriteModel.findOneAndUpdate(
    { userId },
    { $pull: { products: productId } },
    { new: true },
  );
  return await getFavorites(userId);
};

export const clearFavorites = async (userId: string) => {
await FavoriteModel.findOneAndUpdate(
    { userId },
    { $set: { products: [] } },
    { new: true },
  );
  return await getFavorites(userId);
};
