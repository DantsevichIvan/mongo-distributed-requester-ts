import { Job } from '../models/Job';
import { connectMongo, disconnectMongo } from '../db';
import { JobStatus } from '../types/job';
import { logger } from '../utils/logger';

const jobsSeed = [
  { url: 'https://google.com/', status: JobStatus.New },
  { url: 'https://reddit.com', status: JobStatus.New },
  { url: 'https://example.com/404', status: JobStatus.New }
];

async function seedJobs() {
  await connectMongo();
  try {
    await Job.deleteMany({});
    await Job.insertMany(jobsSeed);
    logger.info('Seeded jobs successfully');
  } catch (err: any) {
    logger.error('Seeding jobs failed', err);
    process.exit(1);
  } finally {
    await disconnectMongo();
  }
}

seedJobs()

