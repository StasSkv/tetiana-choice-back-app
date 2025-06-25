import { NextFunction, Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
} from '../../services/products/products.js';
import createError from 'http-errors';

const productsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const products = await getAllProducts();
  res.status(200).json({ data: products });
};

const productByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  if (!product) {
    throw createError(404, 'Product not found');
  }
  res.json({
    status: 'success',
    data: product,
  });
};

export { productsController, productByIdController };
