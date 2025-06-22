import express, {
  Request,
  Response,
  RequestHandler,
  NextFunction,
} from 'express';
import pino from 'pino-http';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllProducts, getProductById } from './services/products.js';
import path from 'path';

const PORT = getEnvVar('PORT', '3000');

interface ProductParams {
  productId: string;
}

export const startServer = () => {
  dotenv.config();

  const app = express();

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : [];

  const corsOptions: CorsOptions = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(
    pino.default({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.get('/products', async (req: Request, res: Response) => {
    try {
      const products = await getAllProducts();
      res.status(200).json({
        data: products,
      });
    } catch (error) {
      console.error('Failed to get products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const getProductHandler: RequestHandler<ProductParams> = async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await getProductById(productId);

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.status(200).json({ data: product });
    } catch (error) {
      console.error('Failed to get product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  app.get('/products/:productId', getProductHandler);

  app.use(
    (
      err: Error & { statusCode?: number },
      req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).json({
        message: err.message || 'Щось пішло не так',
      });
    },
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
