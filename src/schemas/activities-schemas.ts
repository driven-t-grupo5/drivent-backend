import { EnrollUserToActivityParams } from '@/protocols';
import Joi from 'joi';

export const enrollUserToActivityParamsSchema = Joi.object<EnrollUserToActivityParams>({
  activityId: Joi.number().positive().integer().required(),
});
