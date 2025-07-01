import { SORT_ORDER } from '../../constants/index.js';
import { ProductModel } from '../../db/models/product/product.js';
import { calculatePaginationData } from '../../utils/calculatePaginationData.js';

export const getAllProducts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}: {
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: string;
  filter: any;
}) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  const baseQuery = ProductModel.find();

  if (filter.category) {
    baseQuery.where('category', filter.category);
  }

  const countQuery = ProductModel.find().merge(baseQuery).countDocuments();

  const productsQuery = ProductModel.aggregate()
    .match(filter.category ? { category: filter.category } : {})
    .project({
      imgS: 1,
      name: 1,
      brief: 1,
      rating: 1,
      price: 1,
    })
    .lookup({
      from: 'reviews',
      localField: '_id',
      foreignField: 'productId',
      as: 'reviews',
    })
    .addFields({
      averageRating: { $avg: '$reviews.rating' },
      ratingsCount: { $size: '$reviews' },
    })
    .project({ reviews: 0 })
    .sort({ [sortBy]: sortOrder === SORT_ORDER.ASC ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const [productsCount, products] = await Promise.all([
    countQuery.exec(),
    productsQuery.exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return { products, paginationData };
};

export const getProductById = async (productId: string) => {
  const product = await ProductModel.findById(productId).exec();
  return product;
};
