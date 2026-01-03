export enum CalculationOperation {
  ADD = 'add',
  SUBTRACT = 'subtract',
  MULTIPLY = 'multiply',
}

export function executeCalculation(data: {
  operation: CalculationOperation;
  v1: number;
  v2: number;
}) {
  const { operation, v1, v2 } = data;

  switch (operation) {
    case CalculationOperation.ADD:
      return { value: v1 + v2 };

    case CalculationOperation.SUBTRACT:
      return { value: v1 - v2 };

    case CalculationOperation.MULTIPLY:
      return { value: v1 * v2 };

    default:
      throw new Error(`Unsupported calculation operation: ${operation}`);
  }
}
