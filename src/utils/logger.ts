import pino from 'pino';
import { LogLevel } from '../types/log';

export const logger = pino({ level: process.env.LOG_LEVEL ?? LogLevel.Info });
