import { Injectable } from '@nestjs/common';
import { TaskStatus } from './enum/task-status.enum';

@Injectable()
export class TasksService {
  getAvailableStatuses() {
    return Object.values(TaskStatus);
  }
}
