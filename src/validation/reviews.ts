import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createReviewSchema = Joi.object({
  userId: Joi.string().custom(
    (value: string, helper: Joi.CustomHelpers<string>) => {
      if (value && !isValidObjectId(value)) {
        return helper.message('User id should be a valid mongo id' as any);
      }
      return value;
    },
  ),
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Product ID must be a valid MongoDB ObjectId',
    'string.length': 'Product ID must be 24 characters long',
    'any.required': 'Product ID is required',
  }),
  userName: Joi.string().required().messages({
    'string.base': 'User name must be a string',
    'any.required': 'User name is required',
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be at most 5',
    'any.required': 'Rating is required',
  }),
  comment: Joi.string().min(10).max(500).required().messages({
    'string.base': 'Comment must be a string',
    'any.required': 'Comment is required',
  }),
  productName: Joi.string().required().messages({
    'string.base': 'Product name must be a string',
    'any.required': 'Product name is required',
  }),
});
