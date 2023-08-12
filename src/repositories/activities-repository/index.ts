import { prisma } from '@/config';
import { GetActivitiesByDateParams } from '@/protocols';
import { Activity, Venue } from '@prisma/client';

function includeAvailableTickets(
  activities: (Activity & {
    venue: Venue;
    users: {
      id: number;
    }[];
  })[],
) {
  return activities.map((activity) => {
    const availableTickets = activity.capacity - activity.users.length;
    const result = { ...activity, availableTickets };
    delete result.users;
    return result;
  });
}

const activitiesRepository = {
  async getActivities() {
    const activities = await prisma.activity.findMany({
      include: { venue: true, users: { select: { id: true } } },
    });

    return includeAvailableTickets(activities);
  },

  async getActivityById(activityId: number, { includeSimultaneousActivities = true } = {}) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: { venue: true, users: { select: { id: true } } },
    });

    if (!activity) {
      return null;
    }

    const availableTickets = activity.capacity - activity.users.length;

    if (includeSimultaneousActivities) {
      const simultaneousActivities = await prisma.activity.findMany({
        where: { id: { not: { equals: activity.id } }, startDate: { lt: activity.endDate, gt: activity.startDate } },
        include: { venue: true, users: { select: { id: true } } },
      });

      return { simultaneousActivities, activity: { ...activity, availableTickets } };
    }

    return { ...activity, availableTickets };
  },

  async getActivitiesByDate(params: GetActivitiesByDateParams) {
    const { year, month, day } = params;
    const date = `${year}-${month}-${day}`;
    const midnight = date + 'T00:00:00.000Z';
    const dayPastMidnight = date + 'T23:59:59.999Z';

    const activities = await prisma.activity.findMany({
      where: { startDate: { lte: dayPastMidnight, gte: midnight } },
      include: { venue: true, users: { select: { id: true } } },
    });

    return includeAvailableTickets(activities);
  },

  async getDates() {
    const activities = await activitiesRepository.getActivities();
    const datesArray = activities
      .map((activity) => activity.startDate.toISOString().split('T').at(0))
      .sort((a, b) => (a < b ? -1 : 1));

    return [...new Set(datesArray)];
  },

  async getVenues() {
    const venues = await prisma.venue.findMany();
    return venues.map((venue) => venue.name);
  },

  async enrollUserToActivity(userId: number, activityId: number) {
    return prisma.user.update({ where: { id: userId }, data: { Activity: { connect: { id: activityId } } } });
  },
};

export default activitiesRepository;
