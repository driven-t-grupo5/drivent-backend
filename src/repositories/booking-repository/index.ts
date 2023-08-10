import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;
type UpdateParams = Omit<Booking, "createdAt" | "updatedAt">;

async function create({ roomId, userId }: CreateParams) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
    select: {
      id: true,
      roomId: true,
      userId: true,
      Room: { select: { hotelId: true } },
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    select: {
      id: true,
      roomId: true,
      userId: true,
      Room: { select: { hotelId: true } },
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      roomId: true,
      userId: true,
      Room: { select: { hotelId: true } },
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
    select: {
      id: true,
      roomId: true,
      userId: true,
      Room: { select: { hotelId: true } },
    },
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
};

export default bookingRepository;
