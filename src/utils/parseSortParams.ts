import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder: string) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy: string) => {
  const keysOfProduct = [
    '_id',
    'name',
    'price',
    'averageRating',
    'ratingsCount',
  ];

  if (keysOfProduct.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query: any) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
