import { Request, Response } from 'express';
import { createOrderService } from '../../services/orders/orders.js';
import { telegramBot } from '../../telegramBot/telegramBot.js';
import { getEnvVar } from '../../utils/getEnvVar.js';

const chatId: string = getEnvVar('CHAT_ID');

export const createOrderController = async (req: Request, res: Response) => {
  const order = await createOrderService(req.body);

  const message = `
🛒 *Нове замовлення!*
👤 *Ім’я:* ${order.name}
📞 *Телефон:* ${order.phone}
📦 *Товарів:* ${order.products.length}
💳 *Оплата:* ${order.paymentMethod}
  `;
  try {
    await telegramBot.api.sendMessage(chatId, message);
  } catch (error) {
    console.error('Помилка при надсиланні повідомлення в Telegram:', error);
  }
  res.status(201).json({
    status: 'success',
    data: order,
  });
};
