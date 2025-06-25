import mongoose from 'mongoose';
import { CartModel } from '../../db/models/cart/cart.js';

export const getCart = async (userId: string) => {
  const cart = await CartModel.findOne({ userId });
  return cart;
};

export const addToCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  const cart = await CartModel.findOneAndUpdate(
    { userId },
    {
      $addToSet: {
        products: {
          productId,
          quantity: 1,
        },
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
  return cart;
};

export const updateCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
  quantity: number,
) => {
  const cart = await CartModel.findOneAndUpdate(
    {
      userId,
      'products.productId': productId,
    },
    {
      $set: {
        'products.$.quantity': quantity,
      },
    },
    {
      new: true,
    },
  );

  return cart;
};


export const removeFromCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  const cart = await CartModel.findOneAndUpdate(
    { userId },
    {
      $pull: {
        products: { productId },
      },
    },
    {
      new: true,
    },
  );
  return cart;
};

export const clearCart = async (userId: string) => {
  const cart = await CartModel.findOneAndUpdate(
    { userId },
    { $set: { products: [] } },
    { new: true },
  );
  return cart;
};
