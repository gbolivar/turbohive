import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TaskProcessor } from './processors/task.processor';
import { AppConfig } from './config/app.config';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: AppConfig.redis.host,
        port: Number(AppConfig.redis.port),
      },
    }),
    BullModule.registerQueue({
      name: AppConfig.queues.name,
    }),
  ],
  providers: [TaskProcessor],
})
export class WorkerModule {}
