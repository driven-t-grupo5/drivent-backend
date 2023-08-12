import { ConflictError, NotFoundError } from '@/errors';
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
    return throwNotFoundIfEmpty(activities, 'Nenhuma atividade encontrada');
  },

  async getActivityByDate(params: GetActivitiesByDateParams) {
    const activities = await activitiesRepository.getActivitiesByDate(params);
    return throwNotFoundIfEmpty(activities, 'Nenhuma atividade encontrada');
  },

  async getDates() {
    const dates = await activitiesRepository.getDates();
    return throwNotFoundIfEmpty(dates, 'Nenhuma data encontrada');
  },

  async getVenues() {
    const venues = await activitiesRepository.getVenues();
    return throwNotFoundIfEmpty(venues, 'Nenhum local encontrado');
  },

  async enrollUserToActivity(userId: number, activityId: number) {
    const { activity, simultaneousActivities } = await activitiesRepository.getActivityById(activityId);

    if (!activity) {
      throw new NotFoundError('Nenhuma atividade encontrada com esse id');
    }

    if (activity.availableTickets === 0) {
      throw new ForbiddenError('Atividade já com capacidade máxima');
    }

    if (activity.users.find((user) => user.id === userId)) {
      throw new ConflictError('Usuário já cadastrado nessa atividade');
    }

    if (simultaneousActivities.find((activity) => activity.users.find((user) => user.id === userId))) {
      throw new ConflictError('Usuário já cadastrado em atividade simultânea');
    }

    return activitiesRepository.enrollUserToActivity(userId, activityId);
  },
};

export default activitiesService;
