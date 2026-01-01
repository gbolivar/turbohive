import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

export class BullBoardModule {
  static setup(app, queues: Queue[]) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/admin/queues');

    createBullBoard({
      queues: queues.map(queue => new BullMQAdapter(queue)),
      serverAdapter,
    });

    app.use('/admin/queues', serverAdapter.getRouter());
  }
}
