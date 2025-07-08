import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createAndDeleteCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Product ID must be a valid MongoDB ObjectId',
    'string.length': 'Product ID must be 24 characters long',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
  }),
  userId: Joi.string().custom(
    (value: string, helper: Joi.CustomHelpers<string>) => {
      if (value && !isValidObjectId(value)) {
        return helper.message('User id should be a valid mongo id' as any);
      }
      return value;
    },
  ),
});

export const updateCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Product ID must be a valid MongoDB ObjectId',
    'string.length': 'Product ID must be 24 characters long',
    'any.required': 'Product ID is required',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  userId: Joi.string().custom(
    (value: string, helper: Joi.CustomHelpers<string>) => {
      if (value && !isValidObjectId(value)) {
        return helper.message('User id should be a valid mongo id' as any);
      }
      return value;
    },
  ),
});



export const cartNotAuthorizedSchema = Joi.object({
  productIds: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required().messages({
          'string.hex': 'Product ID must be a valid MongoDB ObjectId',
          'string.length': 'Product ID must be 24 characters long',
          'any.required': 'Product ID is required',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'number.base': 'Quantity must be a number',
          'number.min': 'Quantity must be at least 1',
          'any.required': 'Quantity is required',
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'ProductIds array cannot be empty',
      'any.required': 'ProductIds is required',
    }),
});
