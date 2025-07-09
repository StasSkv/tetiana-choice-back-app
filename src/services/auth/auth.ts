import createHttpError from 'http-errors';
import { UserModel } from '../../db/models/user/user.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, SEVEN_DAYS } from '../../constants/index.js';
import { SessionModel } from '../../db/models/session/session.js';
import { Types } from 'mongoose';

interface RegisterUserPayload {
  name: string;
  phone: string;
  password: string;
}

interface LoginUserPayload {
  phone: string;
  password: string;
}

export const registerUser = async (payload: RegisterUserPayload) => {
  const user = await UserModel.findOne({ phone: payload.phone });
  if (user) {
    throw createHttpError(409, 'Phone already in use');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UserModel.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload: LoginUserPayload) => {
  const user = await UserModel.findOne({ phone: payload.phone });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid phone or password');
  }
  await SessionModel.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionModel.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + SEVEN_DAYS),
  });
};

export const logoutUser = async (sessionId: string) => {
  await SessionModel.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + SEVEN_DAYS),
  };
};

export const refreshUsersSession = async ({
  sessionId,
  refreshToken,
}: {
  sessionId: string;
  refreshToken: string;
}) => {
  const session = await SessionModel.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await SessionModel.deleteOne({ _id: sessionId, refreshToken });
  return await SessionModel.create({
    userId: session.userId,
    ...newSession,
  });
};

export const getCurrentUser = async (
  sessionId: string,
  accessToken: string,
) => {
  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Unauthorized');
  }
  const session = await SessionModel.findOne({
    _id: new Types.ObjectId(sessionId),
    accessToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found or invalid');
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }
  const user = await UserModel.findById(session.userId).select('-password');
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};
