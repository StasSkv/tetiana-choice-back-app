const parseCategory = (category: string) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategory = (category: string) =>
    [
      'biox',
      'white-mandarine',
      'choice-phyto',
      'pro-healthy',
      'green-max',
      'good-food',
      'sets',
    ].includes(category);

  if (isCategory(category)) return category;
};

export const parseFilterParams = (query: any) => {
  const { category } = query;

  const parsedCategory = parseCategory(category);

  return {
    category: parsedCategory,
  };
};
