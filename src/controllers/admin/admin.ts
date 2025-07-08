import { CustomRequest } from '../../types/customRequest.js';
import { Response } from 'express';

export const adminController = async (req: CustomRequest, res: Response) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Admin route',
    },
  });
};
