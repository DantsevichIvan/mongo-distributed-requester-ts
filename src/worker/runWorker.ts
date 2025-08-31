import { claimNextJob } from './claimNextJob';
import { JobForProcessing, processJob } from './processJob.js';
import { sleep } from '../utils/sleep';
import { logger } from '../utils/logger';
import { config } from '../config';

let stopping = false;

export async function runWorker(): Promise<void> {
  const workers = Array.from({ length: config.CONCURRENCY }, (_, i) => loop(i));
  await Promise.all(workers);
}

async function loop(slot: number): Promise<void> {
  while (!stopping) {
    const job: JobForProcessing | null = await claimNextJob();


    if (!job) {
      await sleep(config.IDLE_SLEEP_MS);
      continue;
    }

    try {
      await processJob(job);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error({ err: error }, `Slot ${slot} - process failed`);
      } else {
        logger.error({ err: error }, `Slot ${slot} - unknown error`);
      }
    }
  }
}

export function requestStop(): void {
  stopping = true;
}
