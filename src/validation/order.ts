import Joi from 'joi';

const createOrderSchema = Joi.object({
  userId: Joi.string().hex().length(24).optional().allow(null, '').messages({
    'string.hex': 'User ID must be a valid MongoDB ObjectId',
    'string.length': 'User ID must be 24 characters long',
  }),
  name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must be less than 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Email must be a valid email address',
  }),
  phone: Joi.string()
    .pattern(/^\+?\d{9,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone must be a valid phone number with country code',
      'string.empty': 'Phone is required',
      'any.required': 'Phone is required',
    }),
  products: Joi.array()
    .items(
      Joi.object({
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
      }),
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'Products array must contain at least one item',
      'any.required': 'Products are required',
    }),
  status: Joi.string()
    .valid('pending', 'paid', 'shipped', 'delivered', 'cancelled')
    .optional()
    .messages({
      'any.only':
        'Status must be one of pending, paid, shipped, delivered, cancelled',
    }),
  paymentMethod: Joi.string()
    .valid('card', 'cash', 'overpayment')
    .optional()
    .messages({
      'any.only': 'Payment method must be one of card, cash, overpayment',
    }),
  paymentStatus: Joi.string()
    .valid('pending', 'paid', 'failed')
    .optional()
    .messages({
      'any.only': 'Payment status must be one of pending, paid, failed',
    }),
  recipient: Joi.object({
    fullName: Joi.string().min(2).max(100).required().messages({
      'string.base': 'Recipient fullName must be a string',
      'string.empty': 'Recipient fullName is required',
      'string.min': 'Recipient fullName must be at least 2 characters',
      'string.max': 'Recipient fullName must be less than 100 characters',
      'any.required': 'Recipient fullName is required',
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{9,15}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Recipient phone must be a valid phone number with country code',
        'string.empty': 'Recipient phone is required',
        'any.required': 'Recipient phone is required',
      }),
    city: Joi.string().min(2).max(100).required().messages({
      'string.base': 'Recipient city must be a string',
      'string.empty': 'Recipient city is required',
      'string.min': 'Recipient city must be at least 2 characters',
      'string.max': 'Recipient city must be less than 100 characters',
      'any.required': 'Recipient city is required',
    }),
    deliveryMethod: Joi.string()
      .valid('Nova_Poshta', 'Ukrposhta', 'Self')
      .required()
      .messages({
        'any.only':
          'Delivery method must be one of Nova_Poshta, Ukrposhta, Self',
        'any.required': 'Delivery method is required',
      }),
    department: Joi.string().allow('', null),
  })
    .required()
    .messages({
      'any.required': 'Recipient is required',
    }),
});

export default createOrderSchema;
