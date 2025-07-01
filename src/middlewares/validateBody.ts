import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const validateBody =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err: any) {
      const error = createHttpError(400, 'Bad Request', {
        errors: err.details,
      });
      next(error);
    }
  };
