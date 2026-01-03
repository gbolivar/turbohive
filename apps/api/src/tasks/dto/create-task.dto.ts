import { IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskStrategy } from '../enum/task-strategy.enum';
import { CalculationTaskDataDto } from './calculation-task-data.dto';
import { QrTaskDataDto } from './qr-task-data.dto';

export class CreateTaskDto {
  @IsEnum(TaskStrategy)
  strategy: TaskStrategy;

  @ValidateNested()
  @Type((options) => {
    const obj = options?.object as CreateTaskDto | undefined;
    if (!obj) {
      throw new Error('Object is required');
      return Object;
    }
    const { strategy } = obj;
    switch (strategy) {
      case TaskStrategy.CALCULATION:
        return CalculationTaskDataDto;

      case TaskStrategy.QR:
        return QrTaskDataDto;

      default:
        return Object;
    }
  })
  data: CalculationTaskDataDto | QrTaskDataDto;
}
