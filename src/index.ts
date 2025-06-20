import express, { Request, Response, NextFunction } from 'express';
import pino from 'pino-http';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : [];

console.log('Allowed origins:', allowedOrigins);

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    console.log('Request origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

app.get('/', (req: Request, res: Response) => {
  res.send('Привіт, світ!');
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not found',
  });
});

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
