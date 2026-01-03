//apps/api/src/bull-board/bull-board.module.ts
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';
import { INestApplication } from '@nestjs/common';
import basicAuth from 'express-basic-auth';

export class BullBoardModule {
  static setup(app: INestApplication<any>, queues: Queue[]) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: queues.map((queue) => new BullMQAdapter(queue)),
      serverAdapter,
    });

    app.use(
      '/admin/queues',
      basicAuth({
        users: {
          [process.env.BULLBOARD_USER ?? 'admin']:
            process.env.BULLBOARD_PASS ?? 'admin',
        },
        challenge: true,
      }),
    );

    app.use('/admin/queues', serverAdapter.getRouter());
  }
}
