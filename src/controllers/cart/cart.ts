import { NextFunction, Request, Response } from 'express';
import {
  clearCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
} from '../../services/cart/cart.js';

const userId = '666a1f2c8f1d2c4a12345671';

export const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cart = await getCart(userId);
  res.status(200).json(cart);
};

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.body;
  const cart = await addToCart(userId, productId);
  res.status(200).json(cart);
};

export const updateCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId, quantity } = req.body;
  const cart = await updateCart(userId, productId, quantity);
  res.status(200).json(cart);
};

export const removeFromCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.body;
  const cart = await removeFromCart(userId, productId);
  res.status(200).json(cart);
};

export const clearCartController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cart = await clearCart(userId);
  res.status(200).json(cart);
};
