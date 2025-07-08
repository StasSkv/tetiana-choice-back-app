import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
