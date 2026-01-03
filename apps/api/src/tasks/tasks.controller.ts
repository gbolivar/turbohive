import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueueService } from '../queue/queue.service';
import { AppConfig } from '../config/app.config';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly queueService: QueueService,
  ) {}

  @Post()
  async create(@Body() body: CreateTaskDto) {
    return this.queueService.createTask(AppConfig.queues.name, body);
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
