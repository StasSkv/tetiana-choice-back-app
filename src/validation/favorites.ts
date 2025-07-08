import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createAndDeleteFavoritesSchema = Joi.object({
  userId: Joi.string().custom((value: string, helper: Joi.CustomHelpers<string>) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id' as any);
    }
    return value;
  }),
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Product ID must be a valid MongoDB ObjectId',
    'string.length': 'Product ID must be 24 characters long',
    'any.required': 'Product ID is required',
  }),
});

export const fetchFavoritesFromLocalSchema = Joi.object({
  productIds: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Product IDs must be an array',
      'array.min': 'At least one product ID is required',
      'string.hex': 'Each product ID must be a valid MongoDB ObjectId',
      'string.length': 'Each product ID must be 24 characters long',
      'any.required': 'Product IDs are required',
    }),
});
