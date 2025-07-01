import { NextFunction, Request, Response } from 'express';
import {
  getAllProducts,
  getProductById,
} from '../../services/products/products.js';
import { getAverageRatingForProduct } from '../../services/reviews/reviews.js';
import createError from 'http-errors';
import { parsePaginationParams } from '../../utils/parsePaginationParams.js';
import { parseSortParams } from '../../utils/parseSortParams.js';
import { parseFilterParams } from '../../utils/parseFilterParams.js';

const productsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const products = await getAllProducts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
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
  const { averageRating, ratingsCount } = await getAverageRatingForProduct(
    productId,
  );
  res.json({
    status: 'success',
    data: {
      averageRating,
      ratingsCount,
      ...product.toObject(),
    },
  });
};

export { productsController, productByIdController };
