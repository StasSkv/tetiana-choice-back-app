import { Request } from 'express';
import { IUser } from '../db/models/user/user.js';

export interface CustomRequest extends Request {
  user?: IUser;
}
