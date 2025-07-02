import { NextFunction, Request, Response } from 'express';
import {
  addFavorite,
  clearFavorites,
  getFavorites,
  getFavoritesNotAuthorized,
  removeFavorite,
} from '../../services/favorites/favorites.js';
import mongoose from 'mongoose';

const userId = '685bcaf96a851441801c5a51';

export const getFavoritesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const favorites = await getFavorites(userId);
  res.status(200).json(favorites);
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId: productIdString } = req.body;
  const productId = new mongoose.Types.ObjectId(productIdString);
  const favorite = await addFavorite(userId, productId);
  res.status(201).json(favorite);
};

export const removeFavoriteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId: productIdString } = req.body;
  const productId = new mongoose.Types.ObjectId(productIdString);
  const favorite = await removeFavorite(userId, productId);
  res.status(200).json(favorite);
};

export const clearFavoritesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const favorite = await clearFavorites(userId);
  res.status(200).json(favorite);
};
