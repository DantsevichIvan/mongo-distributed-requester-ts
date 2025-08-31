import { Types } from 'mongoose';
import { Job } from '../models/Job';
import { fetchUrl } from '../utils/fetchUrl';
import { JobStatus } from '../types/job';
import { parseError } from '../utils/error';

export interface JobForProcessing {
  _id: Types.ObjectId;
  url: string;
}

async function updateJobStatus(
  jobId: Types.ObjectId,
  status: JobStatus,
  httpCode: number | null = null,
  lastError?: string
) {
  const update: Record<string, any> = {
    $set: { status, httpCode },
    $unset: { processingBy: '', lockedAt: '' }
  };

  if (lastError) {
    update.$set.lastError = lastError;
  }

  await Job.updateOne({ _id: jobId }, update);
}

export async function processJob(job: JobForProcessing): Promise<void> {
  try {
    const code = await fetchUrl(job.url);
    await updateJobStatus(job._id, JobStatus.Done, code);
  } catch (error: unknown) {
    const { message, httpCode } = parseError(error);
    await updateJobStatus(job._id, JobStatus.Error, httpCode, message);
  }
}

