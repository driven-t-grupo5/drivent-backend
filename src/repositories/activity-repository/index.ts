import { prisma } from "@/config";

const activityRepository = {

  async getActivity() {
    // return prisma.hotel.findMany();
  },

  async createActivity(hotelId: number) {
//     return prisma.hotel.findFirst({
//       where: {
//         id: hotelId,
//       },
//       include: {
//         Rooms: true,
//       }
//     });
//   }
};

export default activityRepository;

