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
    category: { type: String, required: true },
    brief: { type: String, required: true },
    volume: { type: String, required: true },
    price: { type: String, required: true },
    appointment: { type: String, required: true },
    quantity: { type: Number, required: true },
    rating: { type: [Number], default: [] },
    imgS: { type: String, required: true },
    imgL: { type: String, required: true },
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

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

ProductSchema.set('toObject', {
  virtuals: true,
});

export const ProductModel = mongoose.model<ProductDoc>(
  'Product',
  ProductSchema,
);
