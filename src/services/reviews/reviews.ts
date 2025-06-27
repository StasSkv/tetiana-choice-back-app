import mongoose from 'mongoose';
import { ReviewsModel } from '../../db/models/reviews/reviews.js';

export const getReviewsProduct = async () => {
  const reviews = await ReviewsModel.find();
  return reviews;
};

export const getReviewsByUser = async (userId: string) => {
  const reviews = await ReviewsModel.find({ userId });
  return reviews;
};

export const getReviewsByProduct = async (productId: string) => {
  const reviews = await ReviewsModel.find({ productId });
  return reviews;
};

export const createReviewProduct = async (review: {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}) => {
  const newReview = await ReviewsModel.create(review);
  return newReview;
};

interface RatingStats {
  averageRating: number;
  ratingsCount: number;
}

export const getAverageRatingForProduct = async (
  productId: string,
): Promise<RatingStats> => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid productId');
  }

  const result = await ReviewsModel.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: '$productId',
        averageRating: { $avg: '$rating' },
        ratingsCount: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0) {
    return { averageRating: 0, ratingsCount: 0 };
  }

  return {
    averageRating: Number(result[0].averageRating.toFixed(2)),
    ratingsCount: result[0].ratingsCount,
  };
};
