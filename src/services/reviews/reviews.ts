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
