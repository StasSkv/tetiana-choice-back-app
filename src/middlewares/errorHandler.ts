import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError && err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: 'Internal server error' });
};