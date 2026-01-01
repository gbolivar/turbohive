import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [QueueModule, TasksModule],
})
export class AppModule {}
