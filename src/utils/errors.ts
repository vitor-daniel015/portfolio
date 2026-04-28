import { OperationType, FirestoreErrorInfo } from '../types';

export function handleDataError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : (typeof error === 'object' ? JSON.stringify(error) : String(error)),
    operationType,
    path
  };
  console.error('Data Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
