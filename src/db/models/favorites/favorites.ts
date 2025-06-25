import mongoose, { Schema } from 'mongoose';

const FavoriteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const FavoriteModel = mongoose.model('Favorite', FavoriteSchema);
