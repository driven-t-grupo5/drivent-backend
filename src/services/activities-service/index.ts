import { ConflictError, NotFoundError, conflictError, notFoundError } from '@/errors';
import ForbiddenError from '@/errors/forbidden-error';
import { GetActivitiesByDateParams } from '@/protocols';
import activitiesRepository from '@/repositories/activities-repository';

function throwNotFoundIfEmpty<T>(list: Array<T>, message: string) {
  if (list.length === 0) {
    throw new NotFoundError(message);
  }

  return list;
}

const activitiesService = {
  async getActivities() {
    const activities = await activitiesRepository.getActivities();
    return throwNotFoundIfEmpty(activities, 'No activities found');
  },

  async getActivityByDate(params: GetActivitiesByDateParams) {
    const activities = await activitiesRepository.getActivitiesByDate(params);
    return throwNotFoundIfEmpty(activities, 'No activities found');
  },

  async getDates() {
    const dates = await activitiesRepository.getDates();
    return throwNotFoundIfEmpty(dates, 'No dates found');
  },

  async getVenues() {
    const venues = await activitiesRepository.getVenues();
    return throwNotFoundIfEmpty(venues, 'No venues found');
  },

  async enrollUserToActivity(userId: number, activityId: number) {
    const activity = await activitiesRepository.getActivityById(activityId);

    if (!activity) {
      throw new NotFoundError('No activity found with this id');
    }

    if (activity.availableTickets === 0) {
      throw new ForbiddenError('No more seats in this activity');
    }

    if (activity.users.find((user) => user.id === userId)) {
      throw new ConflictError('User already enrolled to this activity');
    }

    return activitiesRepository.enrollUserToActivity(userId, activityId);
  },
};

export default activitiesService;
