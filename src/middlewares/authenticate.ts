import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import { SessionModel } from '../db/models/session/session.js';
import { UserModel } from '../db/models/user/user.js';
import { CustomRequest } from '../types/customRequest.js';

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      return next(createHttpError(401, 'Please provide Authorization header'));
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return next(createHttpError(401, 'Auth header should be of type Bearer'));
    }
    const session = await SessionModel.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }
    if (new Date() > new Date(session.accessTokenValidUntil)) {
      return next(createHttpError(401, 'Access token expired'));
    }
    const user = await UserModel.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
