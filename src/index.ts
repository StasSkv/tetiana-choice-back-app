import 'dotenv/config';
import { initMongoDB } from './db/initMongoDB.js';
import { createServer } from './server.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { telegramBot } from './telegramBot/telegramBot.js';

const PORT = getEnvVar('PORT', '3000');
const WEBHOOK_URL = getEnvVar('WEBHOOK_URL');

const bootstrap = async (): Promise<void> => {
  try {
    await initMongoDB();
    const app = await createServer();

    await telegramBot.api.setWebhook(WEBHOOK_URL);
    console.log('Telegram webhook set');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
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
