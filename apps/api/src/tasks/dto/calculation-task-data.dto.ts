import { IsEnum, IsNumber } from 'class-validator';

export enum CalculationOperation {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
}

export class CalculationTaskDataDto {
  @IsEnum(CalculationOperation)
  operation: CalculationOperation;

  @IsNumber()
  v1: number;

  @IsNumber()
  v2: number;
}
