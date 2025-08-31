import { runWorker, requestStop } from './worker/runWorker';
import { logger } from './utils/logger';
import { registerShutdownSignals } from './utils/signals';
import { connectMongo, disconnectMongo } from './db';

async function main() {
  try {
    await connectMongo();
    logger.info('Mongo connected');
    logger.info('Worker started');

    registerShutdownSignals(shutdown);

    await runWorker();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function shutdown(signal?: string) {
  logger.info(`Received ${signal || 'shutdown'} signal, stopping worker...`);
  requestStop();

  try {
    await disconnectMongo();
    logger.info('Mongo disconnected, exiting.');
    process.exit(0);
  } catch (err: any) {
    logger.error(`Error during shutdown: ${err.message}`);
    process.exit(1);
  }
}

main();
