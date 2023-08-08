import activityRepository from "@/repositories/activity-repository";

const activityService = {

  async getActivity(userId: number) {
    const activity = await activityRepository.getActivity();
    return activity;
  },

  async createActivity(userId: number, hotelId: number) {
    const activity = await activityRepository.createActivity(hotelId);
    return activity;
  }
};

export default activityService;
