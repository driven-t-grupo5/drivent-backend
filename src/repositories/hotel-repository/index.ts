import { prisma } from '@/config';

async function findHotels() {
  const hotels = await prisma.hotel.findMany({ include: { Rooms: true } });
  const capacities = hotels.map((hotel) => hotel.Rooms.map((room) => room.capacity).reduce((acc, cur) => acc + cur), 0);
  hotels.forEach((hotel) => delete hotel.Rooms);

  return hotels.map((hotels, index) => ({ ...hotels, capacity: capacities[index] }));
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
