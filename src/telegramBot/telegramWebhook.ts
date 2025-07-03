import { webhookCallback } from 'grammy';
import { telegramBot } from '../telegramBot/telegramBot.js';
import express from 'express';

export const registerTelegramWebhook = (app: express.Express) => {
  app.use('/webhook/telegram', webhookCallback(telegramBot, 'express'));
};
