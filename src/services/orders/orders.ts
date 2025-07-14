import { ProductModel } from '../../db/models/product/product.js';
import { OrderModel } from '../../db/models/orders/orders.js';
import { getNextOrderNumber } from '../../utils/getNewOrderNumber.js';
import { CreateOrderPayload } from './types.js';

export const createOrderService = async (orderData: CreateOrderPayload) => {
  const {
    userId,
    name,
    email,
    phone,
    products,
    status,
    paymentMethod,
    paymentStatus,
    recipient,
  } = orderData;
  const productIds = products.map((p: any) => p.productId);
  const dbProducts = await ProductModel.find({ _id: { $in: productIds } });
  const orderProducts = products.map((item: any) => {
    const matched = dbProducts.find(
      (p: any) => p._id.toString() === item.productId,
    );
    if (!matched) {
      throw new Error(`Продукт з id ${item.productId} не знайдено`);
    }
    return {
      productId: matched._id,
      name: matched.name,
      price: matched.price,
      priceForPartner: Math.round(matched.price * 0.7),
      points: matched.points,
      quantity: item.quantity,
    };
  });
  const totalPrice = orderProducts.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const totalPoints = orderProducts.reduce(
    (acc: number, item: any) => acc + item.points * item.quantity,
    0,
  );

  const totalPriceForPartner = orderProducts.reduce(
    (acc: number, item: any) => acc + item.priceForPartner * item.quantity,
    0,
  );

  const orderNumber = await getNextOrderNumber();
  const order = await OrderModel.create({
    userId: userId || null,
    orderNumber,
    name,
    email,
    phone,
    authorization: !!userId,
    products: orderProducts,
    totalPrice,
    totalPriceForPartner,
    totalPoints,
    status,
    paymentMethod,
    paymentStatus,
    recipient,
  });

  return order;
};

export const getUserOrdersService = async (userId: string) => {
  const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
  return orders;
};
