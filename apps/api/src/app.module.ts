import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueModule } from './queue/queue.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [QueueModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
