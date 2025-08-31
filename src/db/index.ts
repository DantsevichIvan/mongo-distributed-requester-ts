import mongoose from 'mongoose';
import { config } from '../config';

export async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(config.MONGO_URI as string);
  } catch (error: any) {
    console.error(`Mongo connection error: ${error.message}`);
    throw error;
  }
}

export async function disconnectMongo() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
