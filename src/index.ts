import 'dotenv/config';
import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const bootstrap = async (): Promise<void> => {
  try {
    await initMongoDB();
    startServer();
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Bootstrap error:', e.message);
    } else {
      console.error('Unknown bootstrap error:', e);
    }
    process.exit(1);
  }
};

bootstrap();
