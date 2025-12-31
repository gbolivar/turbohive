import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('utility-queue')
    private readonly queue: Queue,
  ) {}

  async createTask(type: string, payload: any) {
    const taskId = randomUUID();

    await this.queue.add(
      type,
      { payload },
      {
        jobId: taskId, 
      },
    );

    return {
      taskId,
      status: 'queued',
    };
  }

  async getTask(taskId: string) {
    const job = await this.queue.getJob(taskId);

    if (!job) {
      throw new NotFoundException('Task not found');
    }

    const state = await job.getState();

    return {
      taskId,
      status: state,
      result: job.returnvalue ?? null,
      error: job.failedReason ?? null,
    };
  }
}
