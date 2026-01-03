import { Test } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { getQueueToken } from '@nestjs/bullmq';
import { AppConfig } from '../config/app.config';
import { TaskStrategy } from '../tasks/enum/task-strategy.enum';
import { CalculationOperation } from '../tasks/dto/calculation-task-data.dto';

describe('QueueService', () => {
  let queueService: QueueService;
  let queue: Queue;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: AppConfig.queues.name,
          connection: AppConfig.redis,
        }),
      ],
      providers: [QueueService],
    }).compile();

    queueService = moduleRef.get(QueueService);
    queue = moduleRef.get<Queue>(getQueueToken(AppConfig.queues.name));
  });

  afterAll(async () => {
    await queue.obliterate({ force: true });
    await queue.close();
  });

  it('should enqueue a calculation task', async () => {
    const result = await queueService.createTask(AppConfig.queues.name, {
      strategy: TaskStrategy.CALCULATION,
      data: {
        operation: CalculationOperation.ADD,
        v1: 10,
        v2: 30,
      },
    });

    const job = await queue.getJob(result.taskId);
    const payload = job.data['payload'];

    expect(job).toBeDefined();
    expect(payload.strategy).toBe(TaskStrategy.CALCULATION);
    expect(payload.data.v1).toBe(10);
  });
});
