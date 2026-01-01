import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { getQueueToken } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { BullBoardModule } from './bull-board/bull-board.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtener colas desde Nest
  const utilityQueue = app.get<Queue>(getQueueToken('utility-queue'));

  // Instalar Bull Board
  BullBoardModule.setup(app, [utilityQueue]);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
