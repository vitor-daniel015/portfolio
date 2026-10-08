import { OperationType } from '../types';

export function handleDataError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : (typeof error === 'object' ? JSON.stringify(error) : String(error)),
    operationType,
    path
  };
  console.error('Data Error: ', JSON.stringify(errInfo));
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'PGRST205') {
    return 'O catálogo de vídeos ainda não está disponível. Tente novamente mais tarde.';
  }
  return 'Não foi possível concluir a operação. Tente novamente.';
}
