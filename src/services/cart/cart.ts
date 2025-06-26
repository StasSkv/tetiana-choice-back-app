import mongoose from 'mongoose';
import { CartModel } from '../../db/models/cart/cart.js';
import { ProductModel } from '../../db/models/product/product.js';

export const getCart = async (userId: string) => {
  const cart = await CartModel.findOne({ userId });

  if (!cart || cart.products.length === 0) {
    return { products: [], totalPriceCart: 0 };
  }

  const detailedProducts = await Promise.all(
    cart.products.map(async ({ productId, quantity }) => {
      const product = await ProductModel.findById(productId);
      if (!product) return null;

      return {
        productId,
        quantity,
        price: product.price,
        totalPriceProduct: Number(product.price) * quantity,
      };
    }),
  );

  const filteredProducts = detailedProducts.filter(Boolean);

  const totalPriceCart = filteredProducts.reduce(
    (sum, item) => sum + (item?.totalPriceProduct || 0),
    0,
  );

  return { products: filteredProducts, totalPriceCart };
};

export const addToCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  const cart = await CartModel.findOne({ userId });

  if (!cart) {
    await CartModel.create({ userId, products: [{ productId, quantity: 1 }] });
    return await getCart(userId);
  }

  const existingProduct = cart.products.find((p) =>
    p.productId.equals(productId),
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ productId, quantity: 1 });
  }

  await cart.save();
  return await getCart(userId);
};

export const updateCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
  quantity: number,
) => {
  if (quantity === 0) {
    return await removeFromCart(userId, productId);
  }

  await CartModel.findOneAndUpdate(
    { userId, 'products.productId': productId },
    { $set: { 'products.$.quantity': quantity } },
    { new: true },
  );

  return await getCart(userId);
};

export const removeFromCart = async (
  userId: string,
  productId: mongoose.Types.ObjectId,
) => {
  await CartModel.findOneAndUpdate(
    { userId },
    { $pull: { products: { productId } } },
    { new: true },
  );

  return await getCart(userId);
};

export const clearCart = async (userId: string) => {
  await CartModel.findOneAndUpdate(
    { userId },
    { $set: { products: [] } },
    { new: true },
  );

  return await getCart(userId);
};
