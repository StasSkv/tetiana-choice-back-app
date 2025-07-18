import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\+?\d{9,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone must be a valid phone number with country code',
      'string.empty': 'Phone is required',
      'any.required': 'Phone is required',
    }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters',
  }),
});

export const loginUserSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^\+?\d{9,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone must be a valid phone number with country code',
      'string.empty': 'Phone is required',
      'any.required': 'Phone is required',
    }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters',
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\+?\d{9,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone must be a valid phone number with country code',
      'string.empty': 'Phone is required',
      'any.required': 'Phone is required',
    }),
  email: Joi.string().email(),
  dateOfBirth: Joi.string(),
  deliveryOption: Joi.object({
    city: Joi.string().min(2).max(50),
    method: Joi.string().valid('nova_poshta', 'ukrposhta', 'self_pickup', ''),
    department: Joi.string().min(1).max(50),
  }),
});
