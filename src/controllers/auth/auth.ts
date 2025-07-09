import { Request, Response } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from '../../services/auth/auth.js';
import { SEVEN_DAYS } from '../../constants/index.js';
import { ISession } from '../../db/models/session/session.js';
import { getCookieOptions } from '../../utils/getCookieOptions.js';

const setupSession = (res: Response, session: ISession) => {
  const cookieOptions = getCookieOptions();
  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    expires: new Date(Date.now() + SEVEN_DAYS),
  });
  res.cookie('sessionId', session._id, {
    ...cookieOptions,
    expires: new Date(Date.now() + SEVEN_DAYS),
  });
};

export const registerUserController = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(201).json({
    status: 201,
    message: 'User registered and logged in successfully',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

export const loginUserController = async (req: Request, res: Response) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req: Request, res: Response) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  const cookieOptions = getCookieOptions();
  res.clearCookie('sessionId', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);

  res.status(204).send();
};

export const refreshUserSessionController = async (
  req: Request,
  res: Response,
) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
