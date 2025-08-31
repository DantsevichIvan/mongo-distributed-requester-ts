import { Job } from '../models/Job.js';
import { config } from '../config';
import { JobStatus } from '../types/job';
import { JobForProcessing } from './processJob';

export async function claimNextJob(): Promise<JobForProcessing | null> {
  const staleBefore = new Date(Date.now() - config.STALE_MS);

  const job = await Job.findOneAndUpdate({
      $or: [
        { status: JobStatus.New },
        { status: JobStatus.Processing, lockedAt: { $lt: staleBefore } }
      ]
    },
    {
      $set: { status: JobStatus.Processing, lockedAt: new Date(), processingBy: config.INSTANCE_ID },
      $inc: { attempts: 1 }
    },
    { new: true, sort: { createdAt: 1 } }).lean();

  if (!job?._id || !job.url) {
    return null;
  }

  return { _id: job._id, url: job.url };
}
