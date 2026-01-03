import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { QueueService } from '../queue/queue.service';
import { TasksService } from './tasks.service';
import { TaskStrategy } from './enum/task-strategy.enum';
import { CalculationOperation } from './dto/calculation-task-data.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let queueService: QueueService;

  const mockQueueService = {
    createTask: jest.fn(),
    getTask: jest.fn(),
  };

  const mockTasksService = {
    getAvailableStatuses: jest
      .fn()
      .mockReturnValue(['waiting', 'active', 'completed', 'failed']),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: QueueService, useValue: mockQueueService },
        { provide: TasksService, useValue: mockTasksService },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    queueService = module.get<QueueService>(QueueService);
  });

  it('should create a task', async () => {
    mockQueueService.createTask.mockResolvedValue({
      taskId: 'test-id',
      status: 'queued',
    });

    const body = {
      strategy: TaskStrategy.CALCULATION,
      data: {
        operation: CalculationOperation.ADD,
        v1: 10,
        v2: 30,
      },
    };

    const result = await controller.create(body as any);

    expect(queueService.createTask).toHaveBeenCalledTimes(1);
    expect(queueService.createTask).toHaveBeenCalledWith(
      expect.any(String),
      body,
    );

    expect(result).toEqual({
      taskId: 'test-id',
      status: 'queued',
    });
  });

  it('should return available statuses', () => {
    const result = controller.getStatuses();

    expect(result).toEqual({
      statuses: ['waiting', 'active', 'completed', 'failed'],
    });
  });

  it('should get a task by id', async () => {
    mockQueueService.getTask.mockResolvedValue({
      taskId: '123',
      status: 'completed',
      result: { value: 40 },
    });

    const result = await controller.get('123');

    expect(queueService.getTask).toHaveBeenCalledWith('123');
    expect(result).toEqual({
      taskId: '123',
      status: 'completed',
      result: { value: 40 },
    });
  });
});
