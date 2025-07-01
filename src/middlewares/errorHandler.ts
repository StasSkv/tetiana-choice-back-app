import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (
  err: Error & { status?: number; errors?: any[] },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    err instanceof HttpError &&
    err.status &&
    err.status >= 400 &&
    err.status < 500
  ) {
    if (err.errors) {
      return res.status(err.status).json({
        message: err.message,
        details: err.errors.map((e: any) => e.message),
      });
    }
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal server error' });
};
