import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find(
    {},
    'id imgS name brief rating price ',
  ).exec();
  return products;
};

export const getProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId).exec();
  return product;
};
