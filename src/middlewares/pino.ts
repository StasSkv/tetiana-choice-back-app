import pino from 'pino-http';

export const pinoMiddleware = pino.default({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});