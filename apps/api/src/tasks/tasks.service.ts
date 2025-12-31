import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  getAvailableStatuses() {
    return Object.values(TaskStatus);
  }
}
