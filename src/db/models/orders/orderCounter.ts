import mongoose from 'mongoose';

const orderCounterSchema = new mongoose.Schema({
  _id: String,
  seq: {
    type: Number,
    default: 0,
  },
});

export const OrderCounterModel = mongoose.model('Counter', orderCounterSchema);
