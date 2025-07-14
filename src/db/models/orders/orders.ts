import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    orderNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    authorization: { type: Boolean, default: false },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        points: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    totalPriceForPartner: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash', 'overpayment'],
      default: 'overpayment',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true, versionKey: false },
);

const RecipientSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  deliveryMethod: {
    type: String,
    enum: ['Nova_Poshta', 'Ukrposhta', 'Self'],
    default: 'Nova_Poshta',
  },
  department: { type: String, required: false },
});

OrderSchema.add({ recipient: RecipientSchema });

export const OrderModel = mongoose.model('Order', OrderSchema);
