import { OrderCounterModel } from '../db/models/orders/orderCounter.js';

export const getNextOrderNumber = async () => {
  const updatedCounter = await OrderCounterModel.findByIdAndUpdate(
    { _id: 'order' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );

  return updatedCounter.seq;
};
