import { ProductModel } from '../../db/models/product/product.js';
import { OrderModel } from '../../db/models/orders/orders.js';

export const createOrderService = async (orderData: any) => {
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
    const matched = dbProducts.find((p: any) => p._id.toString() === item.productId);
    if (!matched) {
      throw new Error(`Продукт з id ${item.productId} не знайдено`);
    }
    return {
      productId: matched._id,
      name: matched.name,
      price: matched.price,
      quantity: item.quantity,
    };
  });

  const totalPrice = orderProducts.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  const order = await OrderModel.create({
    userId: userId || null,
    name,
    email,
    phone,
    authorization: !!userId,
    products: orderProducts,
    totalPrice,
    status,
    paymentMethod,
    paymentStatus,
    recipient,
  });

  return order;
};
