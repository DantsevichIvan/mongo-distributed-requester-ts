import 'dotenv/config';
import { z } from 'zod';
import { LogLevel } from '../types/log';

const configSchema = z.object({
  MONGO_URI: z.string().url('MONGO_URI must be a valid Mongo connection string'),
  CONCURRENCY: z.coerce.number().int().positive().default(5),
  REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
  STALE_MS: z.coerce.number().int().positive().default(60000),
  IDLE_SLEEP_MS: z.coerce.number().int().positive().default(300),
  MAX_ATTEMPTS: z.coerce.number().int().positive().default(3),
  LOG_LEVEL: z.nativeEnum(LogLevel).default(LogLevel.Info)
});

const parsed = configSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', parsed.error.format());
  process.exit(1);
}

const INSTANCE_ID = `${process.pid}-${Math.random().toString(36).slice(2, 8)}`;

export const config = {
  ...parsed.data,
  INSTANCE_ID
};

export type Config = typeof config;
