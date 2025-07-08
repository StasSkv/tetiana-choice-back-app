import { NextFunction, Request, Response } from 'express';
import {
  addFavorite,
  clearFavorites,
  getFavorites,
  getFavoritesNotAuthorized,
  removeFavorite,
} from '../../services/favorites/favorites.js';
import mongoose from 'mongoose';
import { CustomRequest } from '../../types/customRequest.js';


export const getFavoritesController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const favorites = await getFavorites(userId.toString());
    res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteNotAuthorizedController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productIds } = req.body;
  const favorites = await getFavoritesNotAuthorized(productIds);
  res.status(200).json(favorites);
};

export const addFavoriteController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId: productIdString } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const productId = new mongoose.Types.ObjectId(productIdString);
    const favorite = await addFavorite(userId.toString(), productId);

    res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }
};

export const removeFavoriteController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { productId: productIdString } = req.body;
    const productId = new mongoose.Types.ObjectId(productIdString);
    const favorite = await removeFavorite(userId.toString(), productId);
    res.status(200).json(favorite);
  } catch (error) {
    next(error);
  }
};

export const clearFavoritesController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const favorite = await clearFavorites(userId.toString());
    res.status(200).json(favorite);
  } catch (error) {
    next(error);
  }
};
