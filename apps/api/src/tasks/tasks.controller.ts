import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { QueueService } from '../queue/queue.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly queueService: QueueService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return this.queueService.createTask('utility-job', body);
  }

  @Get('statuses')
  getStatuses() {
    return {
      statuses: this.tasksService.getAvailableStatuses(),
    };
  }

  @Get(':taskId')
  async get(@Param('taskId') taskId: string) {
    return this.queueService.getTask(taskId);
  }
}
