import mongoose, { Schema, InferSchemaType } from 'mongoose';
import { JobStatus } from '../types/job';

const JobSchema = new Schema({
  url: { type: String, required: true },
  status: { type: String, enum: Object.values(JobStatus), default: JobStatus.New, index: true },
  httpCode: { type: Number, default: null },
  attempts: { type: Number, default: 0 },
  lastError: { type: String, default: null },
  processingBy: { type: String, default: null, index: true },
  lockedAt: { type: Date, default: null, index: true }
}, { timestamps: true });

JobSchema.index({ url: 1 }, { unique: true });
JobSchema.index({ status: 1, lockedAt: 1 });

export type JobDocument = InferSchemaType<typeof JobSchema> & { _id: mongoose.Types.ObjectId };
export const Job = mongoose.model('Job', JobSchema);
