import { ProductModel } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductModel.find(
    {},
    'id quantity rating imgS appointment name',
  ).exec();
  return products;
};

export const getProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId).exec();
  return product;
};
