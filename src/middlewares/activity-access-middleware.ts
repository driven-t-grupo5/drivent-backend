import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/protocols';
import { prisma } from '@/config';
import PaymentRequiredError from '@/errors/payment-required-error';
import ForbiddenError from '@/errors/forbidden-error';

export async function validateActivityAccess(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { Enrollment: { include: { Ticket: { include: { TicketType: true } } } }, Booking: true },
  });

  if (
    user.Enrollment.length === 0 ||
    user.Enrollment[0].Ticket.length === 0 ||
    user.Enrollment[0].Ticket[0].status !== 'PAID'
  ) {
    throw new PaymentRequiredError('É necessário ter o pagamento confirmado para acessar as atividades');
  }

  if (user.Enrollment[0].Ticket[0].TicketType.isRemote || !user.Enrollment[0].Ticket[0].TicketType.includesHotel) {
    throw new ForbiddenError('Ingressos que não incluem hospedagem dão acesso a todas as atividades');
  }

  if (user.Booking.length === 0) {
    throw new ForbiddenError('É nessesário ter reservado um quarto para escolher atividades');
  }

  next();
}
