import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';
import { ResponseError } from './common';

export function conflictError(message: string): ApplicationError {
  return {
    name: 'ConflictError',
    message,
  };
}

export class ConflictError extends ResponseError {
  responseStatusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
    this.responseStatusCode = httpStatus.CONFLICT;
  }
}
