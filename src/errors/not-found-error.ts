import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';
import { ResponseError } from './common';

export function notFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'No result for this search!',
  };
}

export class NotFoundError extends ResponseError {
  responseStatusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.responseStatusCode = httpStatus.NOT_FOUND;
  }
}
