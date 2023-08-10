import { AuthenticatedRequest } from '@/protocols';
import { Response } from 'express';
import activitiesService from '@/services/activities-service';
import { EnrollUserToActivityRequest, GetActivitiesByDateRequest } from '@/protocols';

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  const activities = await activitiesService.getActivities();
  return res.send(activities);
}

export async function getActivitiesByDate(req: GetActivitiesByDateRequest, res: Response) {
  const activities = await activitiesService.getActivityByDate(req.params);
  return res.send(activities);
}

export async function getDates(req: AuthenticatedRequest, res: Response) {
  const dates = await activitiesService.getDates();
  return res.send({ dates });
}

export async function getVenues(req: AuthenticatedRequest, res: Response) {
  const venues = await activitiesService.getVenues();
  return res.send({ venues });
}

export async function enrollUserToActivity(req: EnrollUserToActivityRequest, res: Response) {
  await activitiesService.enrollUserToActivity(req.userId, Number(req.params.activityId));
  return res.send();
}
