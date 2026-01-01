import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { TasksModule } from './tasks/tasks.module';
import { BullBoardModule } from './bull-board/bull-board.module';

@Module({
  imports: [QueueModule, TasksModule, BullBoardModule],
  providers: [
    {
      provide: 'APP',
      useFactory: async () => {
        const app = await import('@nestjs/core').then(m => 
          m.NestFactory.create(AppModule),
        );
        return app;
      },
    },
  ],
})
export class AppModule {}
