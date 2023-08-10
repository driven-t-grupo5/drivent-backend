import httpStatus from 'http-status';
import { ResponseError } from './common';

export default class PaymentRequiredError extends ResponseError {
  responseStatusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'PaymentRequiredError';
    this.responseStatusCode = httpStatus.PAYMENT_REQUIRED;
  }
}
