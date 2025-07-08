
import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import { CustomRequest } from '../types/customRequest.js';

export const authorizeRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return next(createHttpError(403, 'Access denied'));
    }
    next();
  };
};
