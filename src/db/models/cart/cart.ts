import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const CartModel = mongoose.model('Cart', CartSchema);
