import mongoose, { Schema, Document } from 'mongoose';
import {
  Product as ProductType,
  Description,
  Option,
  OptionAction,
} from './product.types.js';

interface ProductDoc extends Document, ProductType {}

const DescriptionSchema = new Schema<Description>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
});

const OptionActionSchema = new Schema<OptionAction>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
});

const OptionSchema = new Schema<Option>({
  actions: { type: [OptionActionSchema], required: true },
  name: String,
  desc: String,
});

const ProductSchema = new Schema<ProductDoc>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Biox',
        'White Mandarin',
        'Choice Phyto',
        'Pro Healthy',
        'Green Max',
        'Good Food',
        'Sets',
      ],
    },
    brief: { type: String, required: true },
    volume: { type: String, required: true },
    price: { type: Number, required: true },
    pricePartner: { type: Number, required: true },
    appointment: { type: String, required: true },
    quantity: { type: Number, required: true },
    rating: { type: [Number], default: [] },
    imgS: { type: String, required: true },
    imgL: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: [DescriptionSchema], required: true },
    advantages: { type: [String], required: true },
    actions: { type: [String], required: true },
    options: { type: [OptionSchema], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ProductModel = mongoose.model<ProductDoc>(
  'Product',
  ProductSchema,
);
