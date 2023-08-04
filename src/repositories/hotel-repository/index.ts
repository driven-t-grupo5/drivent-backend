import { prisma } from '@/config';

async function findHotels() {
  const hotels = await prisma.hotel.findMany({
    include: { Rooms: { include: { Booking: { select: { id: true } } } } },
  });

  const availableRooms: number[] = [];
  const availableTypes: number[][] = [];

  hotels.forEach((hotel) => {
    const totalCapacity = hotel.Rooms.reduce((acc, cur) => acc + cur.capacity, 0);
    const guests = hotel.Rooms.reduce((acc, cur) => acc + cur.Booking.length, 0);
    const capacities = [...new Set(hotel.Rooms.map((room) => room.capacity))].sort((a, b) => a - b);
    availableRooms.push(totalCapacity - guests);
    availableTypes.push(capacities);
    delete hotel.Rooms;
  });

  return hotels.map((hotel, index) => ({
    ...hotel,
    availableRooms: availableRooms[index],
    availableTypes: availableTypes[index],
  }));
}

async function findRoomsByHotelId(hotelId: number) {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: { Rooms: { include: { Booking: { select: { id: true } } } } },
  });

  if (hotel === null) {
    return null;
  }

  const guests = hotel.Rooms.map((room) => room.Booking.length);
  hotel.Rooms.forEach((room) => delete room.Booking);

  return { ...hotel, Rooms: hotel.Rooms.map((room, index) => ({ ...room, guests: guests[index] })) };
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
