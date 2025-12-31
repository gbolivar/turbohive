import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('utility-queue')
export class UtilityProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('🔥 Job tomado por worker:', job.id);

    // Simulación de trabajo
    await new Promise(res => setTimeout(res, 2000));

    return {
      ok: true,
      processedAt: new Date().toISOString(),
    };
  }
}
