import { Bot } from 'grammy';
import { getEnvVar } from '../utils/getEnvVar.js';

const token: string = getEnvVar('TELEGRAM_BOT_TOKEN');

export const telegramBot = new Bot(token);

telegramBot.command('start', (ctx) => {
  ctx.reply('Hello');
});



telegramBot.start();
