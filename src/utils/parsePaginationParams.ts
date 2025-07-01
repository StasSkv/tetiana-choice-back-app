export const parseNumber = (number: string, defaultValue: number) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query: any) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 20);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
