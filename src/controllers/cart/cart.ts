import { NextFunction, Request, Response } from 'express';
import {
  clearCart,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  getCartNotAuthorized,
} from '../../services/cart/cart.js';
import { CustomRequest } from '../../types/customRequest.js';


export const getCartController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
 try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await getCart(userId.toString());
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getCartNotAuthorizedController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productIds } = req.body;
  const cart = await getCartNotAuthorized(productIds);
  res.status(200).json(cart);
};

export const addToCartController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.body;
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const cart = await addToCart(userId.toString(), productId);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateCartController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { productId, quantity } = req.body;
  const cart = await updateCart(userId.toString(), productId, quantity);
  res.status(200).json(cart);
};

export const removeFromCartController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { productId } = req.body;
  const cart = await removeFromCart(userId.toString(), productId);
  res.status(200).json(cart);
};

export const clearCartController = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const cart = await clearCart(userId.toString());
  res.status(200).json(cart);
};
