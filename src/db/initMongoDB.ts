import { getEnvVar } from '../utils/getEnvVar.js';
import mongoose from 'mongoose';

export const initMongoDB = async (): Promise<void> => {
  try {
    const user: string = getEnvVar('MONGODB_USER');
    const pwd: string = getEnvVar('MONGODB_PASSWORD');
    const url: string = getEnvVar('MONGODB_URL');
    const db: string = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('Error while setting up mongo connection:', e.message);
    } else {
      console.log('Unknown error while setting up mongo connection:', e);
    }
    throw e;
  }
};
