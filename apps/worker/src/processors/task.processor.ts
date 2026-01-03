import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { AppConfig } from '../config/app.config';
import { TaskStrategy } from './enum/task-strategy.enum';

// strategies
import { executeCalculation } from '../strategies/calculation.strategy';
import { generateQr } from '../strategies/qr.strategy';

@Processor(AppConfig.queues.name)
export class TaskProcessor extends WorkerHost {
  async process(
    job: Job<{
      strategy: TaskStrategy;
      data: any;
    }>,
  ) {
    const payload  = job.data['payload'];
    let result: any;
    console.log('Job execute:', job.id);
    console.log(
      'job.data:',
      JSON.stringify(payload, null, 2));
  

    switch (payload.strategy) {
      case TaskStrategy.CALCULATION:
        result = executeCalculation(payload.data);
        break;

      case TaskStrategy.QR:
        result = await generateQr(payload.data);
        break;

      default:
        throw new Error(`Unsupported strategy: ${payload.strategy}`);
    }

    // 🔑 Lo que retornás acá es lo que después ve la API
    return {
      strategy: payload.strategy,
      result,
      processedAt: new Date().toISOString(),
    };
  }
}