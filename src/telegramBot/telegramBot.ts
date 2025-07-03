import { Bot } from 'grammy';
import { getEnvVar } from '../utils/getEnvVar.js';

const token: string = getEnvVar('TELEGRAM_BOT_TOKEN');

export const telegramBot = new Bot(token);

telegramBot.command('start', (ctx) => {
  console.log('chat id (start):', ctx.chat.id);
  ctx.reply('Hello');
});

telegramBot.command('help', (ctx) => {
  console.log('chat id (help):', ctx.chat.id);
  ctx.reply('Help');
});
