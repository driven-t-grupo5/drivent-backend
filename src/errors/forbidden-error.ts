import httpStatus from 'http-status';
import { ResponseError } from './common';

export default class ForbiddenError extends ResponseError {
  responseStatusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
    this.responseStatusCode = httpStatus.FORBIDDEN;
  }
}
