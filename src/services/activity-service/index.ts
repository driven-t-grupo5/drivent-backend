/*
import activityRepository from "@/repositories/activity-repository";
import enrollmentRepository from "../../repositories/enrollment-repository";
import ticketRepository from "../../repositories/ticket-repository";
import { notFoundError } from "../../errors";

const activityService = {

    // Função para validar se um usuário pode participar de atividades
    async validActivities(userId: number) {
      // Busca a inscrição do usuário
      const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
      if (!enrollment) {
        throw notFoundError(); // Lança erro 404 caso não haja inscrição
      }
    
      // Busca o ticket relacionado à inscrição
      const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    
      if (!ticket || ticket.status === 'RESERVED') {
        throw new Error('402 Payment Required'); // Lança erro 402 caso o pagamento não tenha sido confirmado
      }
      if (ticket.TicketType.isRemote) {
        throw new Error('403 Forbidden'); // Lança erro 403 caso o ingresso não inclua hospedagem
      }
    },

    // Obtém uma atividade para um usuário
    async getActivity(userId: number) {
      await this.validActivities(userId);
      const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
      const activity = await activityRepository.getActivity(enrollment.id);
      if (!activity) {
        throw notFoundError(); // Lança erro caso a atividade não seja encontrada
      }
      return activity;
    },
  
    // Obtém uma atividade por data para um usuário
    async getActivityByDate(userId: number, date: Date) {
      await this.validActivities(userId);
      const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
      const activity = await activityRepository.getActivityByDate(date, enrollment.id);
      if (!activity) {
        throw notFoundError(); // Lança erro caso a atividade não seja encontrada para a data fornecida
      }
      return activity;
    }
  
    // Obtém datas disponíveis para atividades
    async getDates(userId: number) {
      await this.validActivities(userId);
      const dates = await activityRepository.getDates();
      if (!dates) {
        throw notFoundError(); // Lança erro caso não haja datas disponíveis
      }
      return dates;
    }
    
    // Obtém locais disponíveis para atividades
    async getVenues(userId: number) {
      await this.validActivities(userId);
      const venues = await activityRepository.getVenues();
      if (!venues) {
        throw notFoundError(); // Lança erro caso não haja locais disponíveis
      }
      return venues;
    }

  //Posts
  // async createActivity(userId: number, hotelId: number) {}

  };
export default activityService;
*/
