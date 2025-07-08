import { NextFunction, Request, Response, RequestHandler } from 'express';

export const ctrlWrapper = <Req extends Request = Request>(
  ctrl: (req: Req, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req as Req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
