import { Router } from 'express';
import { authenticateToken, validateParams } from '@/middlewares';
import { validateParamsDate } from '@/middlewares/validate-params-date-middleware';
import { validateActivityAccess } from '@/middlewares/activity-access-middleware';
import { enrollUserToActivity, getActivities, getActivitiesByDate, getDates, getVenues } from '@/controllers';
import { enrollUserToActivityParamsSchema } from '@/schemas/activities-schemas';

const activitiesRouter = Router();

activitiesRouter
  .all('*', authenticateToken)
  .all('*', validateActivityAccess)
  .get('', getActivities)
  .get('/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})', validateParamsDate, getActivitiesByDate)
  .get('/dates', getDates)
  .get('/venues', getVenues)
  .post('/:activityId/enroll', validateParams(enrollUserToActivityParamsSchema), enrollUserToActivity);

export { activitiesRouter };
