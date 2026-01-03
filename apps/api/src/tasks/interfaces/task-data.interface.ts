export interface CalculationTaskData {
  v1: number;
  v2: number;
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
}

export type TaskData = CalculationTaskData;
