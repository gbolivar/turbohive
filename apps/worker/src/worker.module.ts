import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { UtilityProcessor } from './processors/utility.processor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'utility-queue',
    }),
  ],
  providers: [UtilityProcessor],
})
export class WorkerModule {}
