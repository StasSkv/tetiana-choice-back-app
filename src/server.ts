import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import productRouter from './routers/products/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { pinoMiddleware } from './middlewares/pino.js';
import { corsOptions } from './middlewares/cors.js';
import favoritesRouter from './routers/favorites/favorites.js';
import cartRouter from './routers/cart/cart.js';
import reviewsRouter from './routers/reviews/reviews.js';

const PORT = getEnvVar('PORT', '3000');

export const startServer = () => {
  dotenv.config();

  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(pinoMiddleware);

  app.use('/products', productRouter);
  app.use('/favorites', favoritesRouter);
  app.use('/cart', cartRouter);
  app.use('/reviews', reviewsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
