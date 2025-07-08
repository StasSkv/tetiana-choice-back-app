import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routers/products/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { pinoMiddleware } from './middlewares/pino.js';
import { corsOptions } from './middlewares/cors.js';
import favoritesRouter from './routers/favorites/favorites.js';
import cartRouter from './routers/cart/cart.js';
import reviewsRouter from './routers/reviews/reviews.js';
import ordersRouter from './routers/orders/orders.js';
import { registerTelegramWebhook } from './telegramBot/telegramWebhook.js';
import authRouter from './routers/auth/auth.js';
// import adminRouter from './routers/admin/admin.js';

dotenv.config();

export const createServer = async () => {
  const app = express();

  const { default: cookieParser } = await import('cookie-parser');

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoMiddleware);

  app.use('/products', productRouter);
  app.use('/favorites', favoritesRouter);
  app.use('/cart', cartRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/orders', ordersRouter);
  app.use('/auth', authRouter);
  // app.use('/admin', adminRouter);

  registerTelegramWebhook(app);

  app.use(notFoundHandler);
  app.use(errorHandler as any);

  return app;
};
