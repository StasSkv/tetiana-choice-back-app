import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minlength: 10, maxlength: 500 },
    userName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ReviewsModel = mongoose.model('Reviews', ReviewSchema);
