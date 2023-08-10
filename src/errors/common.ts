import httpStatus from 'http-status';

export class ResponseError extends Error {
  responseStatusCode = httpStatus.INTERNAL_SERVER_ERROR;
}
