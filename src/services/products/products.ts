import { ProductModel } from '../../db/models/product/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.aggregate([
    {
      $project: {
        imgS: 1,
        name: 1,
        brief: 1,
        rating: 1,
        price: 1,
      },
    },
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
        averageRating: { $avg: '$reviews.rating' },
        ratingsCount: { $size: '$reviews' },
      },
    },
    {
      $project: {
        reviews: 0,
      },
    },
  ]);

  return products;
};

export const getProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId).exec();
  return product;
};
