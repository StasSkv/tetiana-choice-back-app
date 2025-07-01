import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import productRouter from './routers/products/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { pinoMiddleware } from './middlewares/pino.js';
import { corsOptions } from './middlewares/cors.js';
import favoritesRouter from './routers/favorites/favorites.js';
import cartRouter from './routers/cart/cart.js';
import reviewsRouter from './routers/reviews/reviews.js';
import ordersRouter from './routers/orders/orders.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = getEnvVar('PORT', '3000');

export const startServer = () => {

  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(pinoMiddleware);

  app.use('/products', productRouter);
  app.use('/favorites', favoritesRouter);
  app.use('/cart', cartRouter);
  app.use('/reviews', reviewsRouter);
  app.use('/orders', ordersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler as any);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
