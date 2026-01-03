import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppConfig } from '../config/app.config';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(AppConfig.queues.name)
    private readonly queue: Queue,
  ) {}

  async createTask(queue: string, payload: CreateTaskDto) {
    const taskId = randomUUID();

    await this.queue.add(
      queue,
      {
        payload,
      },
      {
        jobId: taskId,
        removeOnComplete: {
          age: AppConfig.redis.ttl,
          count: AppConfig.redis.items,
        },
        removeOnFail: {
          age: AppConfig.redis.ttl_failed,
          count: AppConfig.redis.items,
        },
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
