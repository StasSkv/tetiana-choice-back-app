import { NextFunction, Request, Response } from 'express';
import {
  createReviewProduct,
  getReviewsByProduct,
  getReviewsByUser,
  getReviewsProduct,
} from '../../services/reviews/reviews.js';
import { CustomRequest } from '../../types/customRequest.js';

export const getAllReviewsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reviews = await getReviewsProduct();
  res.status(200).json(reviews);
};

export const getReviewsByUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reviews = await getReviewsByUser(req.params.userId);
  res.status(200).json(reviews);
};

export const getReviewsByProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reviews = await getReviewsByProduct(req.params.productId);
  res.status(200).json(reviews);
};

export const createReviewController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const review = await createReviewProduct({ ...req.body, userId });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
