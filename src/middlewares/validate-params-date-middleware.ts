import { NextFunction, Response } from 'express';
import { GetActivitiesByDateRequest } from '@/protocols';
import Joi from 'joi';
import httpStatus from 'http-status';

export async function validateParamsDate(req: GetActivitiesByDateRequest, res: Response, next: NextFunction) {
  const { year, month, day } = req.params;
  const { error } = Joi.date().validate(`${year}-${month}-${day}`);

  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }

  next();
}
