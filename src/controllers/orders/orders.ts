import { Request, Response } from 'express';
import { createOrderService } from '../../services/orders/orders.js';

export const createOrderController = async (req: Request, res: Response) => {
  const order = await createOrderService(req.body);
  res.status(201).json({
    status: 'success',
    data: order,
  });
};
