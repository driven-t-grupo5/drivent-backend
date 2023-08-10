import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';

const prisma = new PrismaClient();

async function createEvent() {
  console.log('Creating event...');

  return prisma.event.create({
    data: {
      title: 'Driven.t',
      logoImageUrl:
        'https://uploads-ssl.webflow.com/62235d098ddf9185c2d74422/63501c4f05bcfe3a3ce9327a_logo_pink%20(1).png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, 'days').toDate(),
    },
  });
}

function getCapacityFromRoomNumber(roomNumber: number) {
  if (roomNumber <= 105) return 1;
  if (roomNumber > 200) return 3;
  return 2;
}

function getRooms() {
  const roomNumberMapper = (n: number, index: number) => {
    const roomNumber = n + index;
    return {
      name: roomNumber.toString(),
      capacity: getCapacityFromRoomNumber(roomNumber),
    };
  };

  const firstFloor = Array(10).fill(101).map(roomNumberMapper);
  const secondFloor = Array(10).fill(201).map(roomNumberMapper);

  return [...firstFloor, ...secondFloor];
}

async function createHotels() {
  console.log('Creating hotels...');

  const images = [
    'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    'https://www.ahstatic.com/photos/c096_ho_00_p_1024x768.jpg',
  ];

  const hotels = images.map((image, index) => {
    return {
      image,
      name: `Hotel ${(index + 1).toString().padStart(2, '0')}`,
      Rooms: {
        create: getRooms(),
      },
    };
  });

  return Promise.all(hotels.map((data) => prisma.hotel.create({ data })));
}

async function createActivities() {
  console.log('Creating activities...');

  const venuesData = [{ name: 'Auditório Principal' }, { name: 'Auditório Lateral' }, { name: 'Sala de Workshop' }];
  const activitiesData = [
    {
      name: 'Atividade 01',
      startDate: '2023-10-22T09:00:00.000Z',
      endDate: '2023-10-22T10:00:00.000Z',
      venueId: 1,
      capacity: 30,
    },
    {
      name: 'Atividade 02',
      startDate: '2023-10-22T10:00:00.000Z',
      endDate: '2023-10-22T11:00:00.000Z',
      venueId: 1,
      capacity: 30,
    },
    {
      name: 'Atividade 03',
      startDate: '2023-10-22T09:00:00.000Z',
      endDate: '2023-10-22T11:00:00.000Z',
      venueId: 2,
      capacity: 30,
    },
    {
      name: 'Atividade 04',
      startDate: '2023-10-22T09:00:00.000Z',
      endDate: '2023-10-22T10:00:00.000Z',
      venueId: 3,
      capacity: 30,
    },
    {
      name: 'Atividade 05',
      startDate: '2023-10-22T10:00:00.000Z',
      endDate: '2023-10-22T11:00:00.000Z',
      venueId: 3,
      capacity: 30,
    },
    {
      name: 'Atividade 06',
      startDate: '2023-10-23T09:00:00.000Z',
      endDate: '2023-10-23T10:30:00.000Z',
      venueId: 1,
      capacity: 30,
    },
    {
      name: 'Atividade 07',
      startDate: '2023-10-22T09:00:00.000Z',
      endDate: '2023-10-22T10:00:00.000Z',
      venueId: 2,
      capacity: 30,
    },
    {
      name: 'Atividade 08',
      startDate: '2023-10-22T10:00:00.000Z',
      endDate: '2023-10-22T11:00:00.000Z',
      venueId: 2,
      capacity: 30,
    },
  ];

  await prisma.venue.createMany({ data: venuesData });
  return prisma.activity.createMany({ data: activitiesData });
}

interface CreateScenarioParams {
  email: string;
  isRemote: boolean;
  includesHotel: boolean;
}

async function createScenario(options: CreateScenarioParams) {
  const { email, isRemote, includesHotel } = options;

  const ticketPricesAndNames = [
    { isRemote: false, includesHotel: false, name: 'Presencial Sem Hotel', price: 250 },
    { isRemote: false, includesHotel: true, name: 'Presencial Com Hotel', price: 200 },
    { isRemote: true, includesHotel: false, name: 'Remoto', price: 100 },
  ];

  const ticket = ticketPricesAndNames.find(
    (item) => item.isRemote === isRemote && item.includesHotel === includesHotel,
  );

  if (!ticket) {
    return;
  }

  const price = ticket.price;
  const name = ticket.name;

  console.log('\nCreating user:');
  console.log({ ...options, password: 'password' });

  return prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync('password', 12),
      Enrollment: {
        create: {
          name: faker.name.findName(),
          cpf: generateCPF(),
          birthday: faker.date.past(),
          phone: faker.phone.phoneNumber('(##) 9####-####'),
          Address: {
            create: {
              street: faker.address.streetName(),
              cep: faker.address.zipCode(),
              city: faker.address.city(),
              neighborhood: faker.address.city(),
              number: faker.datatype.number().toString(),
              state: faker.helpers.arrayElement(getStates()).code,
            },
          },
          Ticket: {
            create: {
              status: 'PAID',
              TicketType: {
                create: {
                  price,
                  includesHotel,
                  isRemote,
                  name,
                },
              },
              Payment: {
                create: {
                  cardIssuer: faker.name.findName(),
                  cardLastDigits: faker.datatype.number({ min: 0, max: 9999 }).toString().padStart(4, '0'),
                  value: price,
                },
              },
            },
          },
        },
      },
    },
  });
}

async function main() {
  await Promise.all([
    createEvent(),
    createHotels(),
    createActivities(),
    createScenario({ email: 'ticketonly@email.com', isRemote: false, includesHotel: false }),
    createScenario({ email: 'hotel@email.com', isRemote: false, includesHotel: true }),
    createScenario({ email: 'remote@email.com', isRemote: true, includesHotel: false }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
